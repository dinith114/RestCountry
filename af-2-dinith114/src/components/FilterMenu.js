// src/components/FilterMenu.js
import React from "react";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const FilterMenu = ({ onFilter }) => {
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      defaultValue=""
      className="w-full px-4 py-2 rounded-md bg-card text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">🌐 Filter by Region</option>
      {regions.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
};

export default FilterMenu;
