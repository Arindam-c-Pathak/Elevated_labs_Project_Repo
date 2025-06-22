import React, { useState } from "react";

const SearchBar = ({ setQuery }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      setQuery(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search: GitHub"
        className="search-input"
      /><button
        type="submit"
        className="search-button"
      >Search
      </button>
    </form>
  );
};

export default SearchBar;
