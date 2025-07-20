const SearchItem = ({ search, setSearch }) => {
    return (
        <div className="search-item">
            <form className="search-item-form" onSubmit={(e) => e.preventDefault()}>
                <div className="search-item-right">
                    <label
                        htmlFor='searchItem'
                        className={search ? "active" : ""}
                    >
                        Search Item
                    </label>
                    <input
                        autoFocus
                        id="searchItem"
                        type="text"
                        role='searchBox'
                        placeholder="Search Item"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchItem;
