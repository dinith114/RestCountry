// src/components/SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <input
      type="text"
      placeholder="🔍 Search countries..."
      value={query}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-md bg-card text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;
