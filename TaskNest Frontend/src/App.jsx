import './App.css'
import List from "./List.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {useEffect, useState} from "react";
import AddItem from "./AddItem.jsx";
import SearchItem from "./SearchItem.jsx";
import axios from 'axios';

function App() {
    //hooks
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");
    const [title, setTitle] = useState("list");
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    useEffect(() => {
        fetchItems()
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/items");
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const saveItem = async(itemTitle) => {
        try {
            const response = await axios.post('http://localhost:8080/api/items', {
                title: itemTitle,
                checked: false,
                favourite: false
            });
            setItems([...items, response.data]);
        } catch (error) {
            console.error("Error saving item:", error);
        }
    };

    //functions
    const itemCount = items.length;
    const activeCount = items.length ? items.filter(item => !item.checked).length : 0;

    const handleCheck = async (id) => {
        try {
            const itemToUpdate = items.find(item => item.id === id);
            const updatedItem = {...itemToUpdate, checked: !itemToUpdate.checked};
            await axios.put(`http://localhost:8080/api/items/${id}`, updatedItem);
            fetchItems();
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const handleFavourite = async (id) => {
        try {
            const itemToUpdate = items.find(item => item.id === id);
            const updatedItem = {...itemToUpdate, favourite: !itemToUpdate.favourite};
            await axios.put(`http://localhost:8080/api/items/${id}`, updatedItem);
            fetchItems();
        } catch (error) {
            console.error("Error updating favourite:", error);
        }
    };

    const handleEdit = async (id, newTitle) => {
        try {
            const itemToUpdate = items.find(item => item.id === id);
            const updatedItem = {...itemToUpdate, title: newTitle};
            await axios.put(`http://localhost:8080/api/items/${id}`, updatedItem);
            setItems(items.map(item => (item.id === id ? updatedItem : item)));
        } catch (error) {
            console.error("Error editing item:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/items/${id}`);
            const updatedItems = items.filter(item => item.id !== id);
            setItems(updatedItems);
        } catch (error) {
            console.error("Error deleting item:", error);
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

    const handleTitleEdit = (newTitle) => {
        setTitle(newTitle);
        setIsEditingTitle(false);
    };

    return (
        <div className="container">
            <Header
                title={title}
                isEditing={isEditingTitle}
                setIsEditing={setIsEditingTitle}
                onTitleEdit={handleTitleEdit}
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