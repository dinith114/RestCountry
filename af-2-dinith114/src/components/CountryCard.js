// src/components/CountryCard.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CountryCard = ({ country }) => {
  const nav = useNavigate();
  const { favorites, toggleFavorite, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const { flags, name, region, population, capital, cca3, languages } = country;
  const isFavorite = favorites.includes(cca3);

  const handleToggle = async (e) => {
    e.stopPropagation(); // prevent card click
    setIsLoading(true);
    await toggleFavorite(cca3, name.common);
    setIsLoading(false);
  };

  return (
    <div
      onClick={() => nav(`/country/${cca3}`)}
      className="rounded-2xl overflow-hidden shadow-lg bg-card text-white relative transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl cursor-pointer"
    >
      <img
        src={flags.svg}
        alt={`${name.common} flag`}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 pb-6">
        {" "}
        {/* space for bottom-right button */}
        <h2 className="text-xl font-bold mb-1">{name.common}</h2>
        <p className="text-sm">
          🌍 {region} &nbsp; 🏛️ {capital?.[0] || "N/A"}
        </p>
        <p className="text-sm mt-2">
          Population: {population.toLocaleString()}
        </p>
      </div>

      {user && (
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`absolute bottom-3 right-3 p-2 rounded-full text-xl ${
            isFavorite
              ? "bg-pink-600 text-white animate-pulse"
              : "bg-gray-700 text-pink-300 hover:text-white"
          }`}
        >
          {isLoading ? "⏳" : isFavorite ? "❤️" : "♡"}
        </button>
      )}
    </div>
  );
};

export default CountryCard;
