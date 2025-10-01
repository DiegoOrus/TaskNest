import { useState } from "react";
import { FaEdit, FaCheck, FaTimes, FaSignOutAlt, FaUser } from "react-icons/fa";

const Header = ({ title = "ToDo", isEditing, setIsEditing, onTitleEdit, username, onLogout }) => {
    const [editTitle, setEditTitle] = useState(title);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editTitle.trim()) {
            onTitleEdit(editTitle.trim());
        } else {
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditTitle(title);
        setIsEditing(false);
    };

    return (
        <header className="header">
            <div className="header-content">
                {isEditing ? (
                    <form className="title-edit-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="title-edit-input"
                            autoFocus
                            onBlur={handleSubmit}
                        />
                        <div className="title-edit-buttons">
                            <button type="submit" className="title-confirm-button">
                                <FaCheck />
                            </button>
                            <button type="button" onClick={handleCancel} className="title-cancel-button">
                                <FaTimes />
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="title-container">
                        <h1 className="heading">{title}</h1>
                        <button
                            className="title-edit-button"
                            onClick={() => setIsEditing(true)}
                            title="Edit title"
                        >
                            <FaEdit />
                        </button>
                    </div>
                )}

                <div className="user-info">
                    <div className="username-display">
                        <FaUser className="user-icon" />
                        <span className="username-text">{username}</span>
                    </div>
                    <button
                        onClick={onLogout}
                        className="logout-button"
                        title="Logout"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;