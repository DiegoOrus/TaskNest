import Item from "./Item.jsx";

const ItemList = ({ items, handleCheck, handleFavourite, handleEdit, handleDelete }) => {
    return (
        <ul className="list">
            {items.map(item => (
                <Item
                    key={item.id}
                    item={item}
                    handleCheck={handleCheck}
                    handleFavourite={handleFavourite}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ))}
        </ul>
    );
};

export default ItemList;