import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import CountryCard from "../components/CountryCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favorites, user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [favCountries, setFavCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");

    const fetchFavDetails = async () => {
      try {
        if (favorites.length > 0) {
          const codes = favorites.join(",");
          const res = await axios.get(
            `https://restcountries.com/v3.1/alpha?codes=${codes}`
          );
          setFavCountries(res.data);
        } else {
          setFavCountries([]);
        }
      } catch (err) {
        console.error("Failed to fetch favorites", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavDetails();
  }, [favorites, user, navigate]);

  if (loading) {
    return (
      <div className="text-center text-gray-900 dark:text-white mt-20 text-lg">
        Loading favorites...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen transition-all bg-light text-gray-900 dark:bg-dark dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
          ❤️ My Favorite Countries
        </h1>

        {favCountries.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-400 text-center text-lg mt-10">
            You haven't added any favorites yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favCountries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
