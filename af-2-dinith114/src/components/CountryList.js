// src/components/CountryList.js
import React, { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import SearchBar from "./SearchBar";
import FilterMenu from "./FilterMenu";
import LanguageMenu from "./LanguageMenu";
import { fetchByName, fetchByRegion } from "../services/countryService";

const CountryList = ({ countries }) => {
  const [filtered, setFiltered] = useState(countries);
  const [regionCountries, setRegionCountries] = useState(countries);

  const handleSearch = async (query) => {
    if (!query) return setFiltered(regionCountries);

    try {
      const res = await fetchByName(query);
      setFiltered(res.data);
    } catch (err) {
      console.error("Search failed", err);
      setFiltered([]);
    }
  };

  const handleFilter = async (region) => {
    if (!region) {
      setRegionCountries(countries);
      setFiltered(countries);
      return;
    }

    try {
      const res = await fetchByRegion(region);
      setRegionCountries(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Region filter failed", err);
      setRegionCountries([]);
      setFiltered([]);
    }
  };

  const handleLanguageFilter = (lang) => {
    if (!lang) {
      setFiltered(regionCountries);
      return;
    }

    const filteredByLang = regionCountries.filter(
      (c) => c.languages && Object.values(c.languages).includes(lang)
    );

    setFiltered(filteredByLang);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <SearchBar onSearch={handleSearch} />
        <FilterMenu onFilter={handleFilter} />
        <LanguageMenu
          onFilter={handleLanguageFilter}
          countries={regionCountries}
        />
      </div>

      <p className="mb-4 text-sm text-gray-400">
        Found {filtered.length} countries
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
