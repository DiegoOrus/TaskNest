import './App.css'
import List from "./List.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {useEffect, useState} from "react";
import AddItem from "./AddItem.jsx";
import SearchItem from "./SearchItem.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import axios from 'axios';

function App() {
    //hooks
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");
    const [title, setTitle] = useState("list");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    useEffect(() => {
        // Check if token exists and validate it
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            validateToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated && token) {
            fetchItems();
            fetchUserProfile();
        }
    }, [isAuthenticated, token]);

    const validateToken = async (tokenToValidate) => {
        try {
            await axios.get("http://localhost:8080/api/auth/validate", {
                headers: {
                    'Authorization': `Bearer ${tokenToValidate}`
                }
            });
            setToken(tokenToValidate);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Token validation failed:", error);
            handleLogout();
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/user/profile", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTitle(response.data.listTitle || "list");
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const handleLogin = (authToken, user) => {
        setToken(authToken);
        setUsername(user);
        setIsAuthenticated(true);
        localStorage.setItem('token', authToken);
        localStorage.setItem('username', user);
    };

    const handleLogout = () => {
        setToken('');
        setUsername('');
        setIsAuthenticated(false);
        setItems([]);
        setTitle("list");
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/items", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
            if (error.response?.status === 401) {
                handleLogout();
            }
        }
    };

    const saveItem = async(itemTitle) => {
        try {
            const response = await axios.post('http://localhost:8080/api/items', {
                title: itemTitle,
                checked: false,
                favourite: false
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setItems([...items, response.data]);
        } catch (error) {
            console.error("Error saving item:", error);
            if (error.response?.status === 401) {
                handleLogout();
            }
        }
    };

    //functions
    const itemCount = items.length;
    const activeCount = items.length ? items.filter(item => !item.checked).length : 0;

    const handleCheck = async (id) => {
        try {
            const itemToUpdate = items.find(item => item.id === id);
            const updatedItem = {...itemToUpdate, checked: !itemToUpdate.checked};
            await axios.put(`http://localhost:8080/api/items/${id}`, updatedItem, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchItems();
        } catch (error) {
            console.error("Error updating item:", error);
            if (error.response?.status === 401) {
                handleLogout();
            }
        }
    };

    const handleFavourite = async (id) => {
        try {
            const itemToUpdate = items.find(item => item.id === id);
            const updatedItem = {...itemToUpdate, favourite: !itemToUpdate.favourite};
            await axios.put(`http://localhost:8080/api/items/${id}`, updatedItem, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchItems();
        } catch (error) {
            console.error("Error updating favourite:", error);
            if (error.response?.status === 401) {
                handleLogout();
            }
        }
    };

    const handleEdit = async (id, newTitle) => {
        try {
            const itemToUpdate = items.find(item => item.id === id);
            const updatedItem = {...itemToUpdate, title: newTitle};
            await axios.put(`http://localhost:8080/api/items/${id}`, updatedItem, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setItems(items.map(item => (item.id === id ? updatedItem : item)));
        } catch (error) {
            console.error("Error editing item:", error);
            if (error.response?.status === 401) {
                handleLogout();
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/items/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const updatedItems = items.filter(item => item.id !== id);
            setItems(updatedItems);
        } catch (error) {
            console.error("Error deleting item:", error);
            if (error.response?.status === 401) {
                handleLogout();
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newItem.trim()){
            return;
        }
        saveItem(newItem);
        setNewItem("");
    }

    const handleTitleEdit = async (newTitle) => {
        try {
            await axios.put('http://localhost:8080/api/user/list-title', {
                listTitle: newTitle
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTitle(newTitle);
            setIsEditingTitle(false);
        } catch (error) {
            console.error("Error updating title:", error);
            if (error.response?.status === 401) {
                handleLogout();
            }
        }
    };

    if (!isAuthenticated) {
        return showRegister ? (
            <Register
                onRegisterSuccess={handleLogin}
                onSwitchToLogin={() => setShowRegister(false)}
            />
        ) : (
            <Login
                onLoginSuccess={handleLogin}
                onSwitchToRegister={() => setShowRegister(true)}
            />
        );
    }

    return (
        <div className="container">
            <Header
                title={title}
                isEditing={isEditingTitle}
                setIsEditing={setIsEditingTitle}
                onTitleEdit={handleTitleEdit}
                username={username}
                onLogout={handleLogout}
            />
            <div className="add-search-container">
                <AddItem
                    NewItem={newItem}
                    setNewItem={setNewItem}
                    handleSubmit={handleSubmit}
                    activeCount={activeCount}
                />
                <SearchItem
                    search={search}
                    setSearch={setSearch}
                />
            </div>
            <List
                title={title}
                items={items.filter(item =>
                    item.title.toLowerCase().includes(search.toLowerCase())
                )}
                handleCheck={handleCheck}
                handleFavourite={handleFavourite}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                activeCount={activeCount}
            />
            <Footer
                itemCount={itemCount}
            />
        </div>
    )
}

export default App