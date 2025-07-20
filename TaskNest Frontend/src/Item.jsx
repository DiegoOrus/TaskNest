import { useState } from "react";
import { FaTrashAlt, FaEdit, FaStar, FaRegStar, FaCheck, FaTimes } from "react-icons/fa";

const Item = ({ item, handleCheck, handleFavourite, handleEdit, handleDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(item.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editText.trim() && editText.trim() !== item.title) {
            handleEdit(item.id, editText.trim());
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(item.title);
        setIsEditing(false);
    };

    return (
        <li key={item.id} className="list-item">
            <div className="item-box">
                <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheck(item.id)}
                    className="checkbox"
                />

                {isEditing ? (
                    <form className="item-edit-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="item-edit-input"
                            autoFocus
                            onBlur={handleSubmit}
                        />
                        <button type="submit" className="item-confirm-button">
                            <FaCheck />
                        </button>
                        <button type="button" onClick={handleCancel} className="item-cancel-button">
                            <FaTimes />
                        </button>
                    </form>
                ) : (
                    <label
                        className={`label ${item.checked ? 'checked' : ''}`}
                        onDoubleClick={() => handleCheck(item.id)}
                    >
                        {item.title}
                    </label>
                )}

                <div className="item-actions">
                    <button
                        onClick={() => handleFavourite(item.id)}
                        className={`favourite-button ${item.favourite ? 'active' : ''}`}
                        title={item.favourite ? "Remove from favourites" : "Add to favourites"}
                    >
                        {item.favourite ? <FaStar /> : <FaRegStar />}
                    </button>

                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="edit-button"
                            title="Edit item"
                        >
                            <FaEdit />
                        </button>
                    )}

                    <FaTrashAlt
                        role="button"
                        tabIndex="0"
                        onClick={() => handleDelete(item.id)}
                        className="delete-button"
                        title="Delete item"
                    />
                </div>
            </div>
        </li>
    );
};

export default Item;