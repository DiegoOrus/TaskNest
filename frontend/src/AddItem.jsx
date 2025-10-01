import { FaPlus } from "react-icons/fa";

const AddItem = ({ NewItem, setNewItem, handleSubmit, activeCount}) => {

    return (
        <form className="add-item" onSubmit={handleSubmit}>
            <div className="add-item-left">
                <p className="add-item-active-count">
                    {activeCount} {activeCount === 1 ? 'Active Task' : 'Active Tasks'}
                </p>
            </div>
            <div className="add-item-right">
                <label htmlFor='addItem' className={NewItem ? 'active' : ''}>
                    Add Item
                </label>
                <input
                    autoFocus
                    id = "addItem"
                    type = 'text'
                    value={NewItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <button
                    type="submit"
                    aria-label={'Add Item'}
                    className={`add-item-button ${NewItem ? 'active' : ''}`}
                    disabled={!NewItem}
                >
                    <FaPlus />
                </button>
            </div>
        </form>
    )

}
export default AddItem;