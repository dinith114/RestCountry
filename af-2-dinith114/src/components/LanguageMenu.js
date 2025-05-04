// src/components/LanguageMenu.js
import React, { useEffect, useState } from "react";
import { FaLanguage } from "react-icons/fa";

const LanguageMenu = ({ onFilter, countries }) => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const langSet = new Set();

    countries.forEach((country) => {
      if (country.languages) {
        Object.values(country.languages).forEach((lang) => langSet.add(lang));
      }
    });

    setLanguages(Array.from(langSet).sort());
  }, [countries]);

  return (
    <div className="relative w-full">
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="">🌐 All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <FaLanguage className="absolute top-3.5 left-3 text-blue-300" />
    </div>
  );
};

export default LanguageMenu;
