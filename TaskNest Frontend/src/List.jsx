import ActiveCount from "./ActiveCount.jsx";
import ItemList from "./ItemList.jsx";

const List = ({ items, handleCheck, handleFavourite, handleEdit, handleDelete, title }) => {
    return (
        <div className="container">
            <main className="main">
                {items.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-text">Your {title} is empty!</p>
                    </div>
                ) : (
                    <ItemList
                        items={items}
                        handleCheck={handleCheck}
                        handleFavourite={handleFavourite}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                )}
            </main>
        </div>
    );
};

export default List;