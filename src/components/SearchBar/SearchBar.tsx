import { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <button type="button">Search</button>
        </div>
    );
};

export default SearchBar;