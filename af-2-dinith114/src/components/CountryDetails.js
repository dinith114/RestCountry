import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllCountries, fetchByCode } from "../services/countryService";
import { motion } from "framer-motion";

const CountryDetails = () => {
  const { code } = useParams();
  const nav = useNavigate();
  const [country, setCountry] = useState(null);
  const [showMap, setShowMap] = useState(true);
  const [similarCountries, setSimilarCountries] = useState([]);

  useEffect(() => {
    fetchByCode(code)
      .then((res) => {
        const fetched = res.data[0];
        setCountry(fetched);
        fetchSimilar(fetched.region, fetched.cca3);
        setShowMap(false); //Reset map when changing country
      })
      .catch((err) => console.error(err));
  }, [code]);

  const fetchSimilar = async (region, currentCode) => {
    try {
      const res = await fetchAllCountries();
      const filtered = res.data.filter(
        (c) => c.region === region && c.cca3 !== currentCode
      );
      setSimilarCountries(filtered.slice(0, 6)); // Limit to 6 for UI
    } catch (err) {
      console.error("Failed to fetch similar countries", err);
    }
  };

  if (!country) return <div>Loading details...</div>;

  const {
    name,
    flags,
    capital,
    region,
    subregion,
    population,
    languages,
    currencies,
    latlng,
  } = country;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={() => nav("/")}
        className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-indigo-500 hover:from-orange-100 hover:to-indigo-600 text-white px-4 py-2 rounded-full shadow hover:shadow-md transition font-semibold mb-6"
      >
        <span className="text-xl">←</span>
        Back to Home
      </button>

      {/* Side-by-side layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Details (fixed width max) */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 max-w-[600px]"
        >
          <img
            src={flags.svg}
            alt={`${name.common} flag`}
            className="w-full h-64 object-cover mb-4 rounded"
          />
          <h1 className="text-3xl font-bold mb-2">{name.common}</h1>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <p>
              <span className="mr-2">🏷️</span>
              <strong>Official Name:</strong> {name.official}
            </p>
            <p>
              <span className="mr-2">🏛️</span>
              <strong>Capital:</strong> {capital?.join(", ") || "N/A"}
            </p>
            <p>
              <span className="mr-2">🌍</span>
              <strong>Region:</strong> {region}
            </p>
            <p>
              <span className="mr-2">🗺️</span>
              <strong>Subregion:</strong> {subregion || "N/A"}
            </p>
            <p>
              <span className="mr-2">👥</span>
              <strong>Population:</strong> {population.toLocaleString()}
            </p>
            <p>
              <span className="mr-2">🗣️</span>
              <strong>Languages:</strong>{" "}
              {languages ? Object.values(languages).join(", ") : "N/A"}
            </p>
            <p className="sm:col-span-2">
              <span className="mr-2">💰</span>
              <strong>Currencies:</strong>{" "}
              {currencies
                ? Object.values(currencies)
                    .map((c) => `${c.name} (${c.symbol})`)
                    .join(", ")
                : "N/A"}
            </p>
          </div>
        </motion.div>

        {/* Conditionally show map without affecting layout */}
        {latlng && showMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-1 h-96 rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyCyIVdolCcqHsBQ5DH2ShHnUqYEP1yn7vM&center=${latlng[0]},${latlng[1]}&zoom=5`}
            />
          </motion.div>
        )}
      </div>

      {/* Toggle button */}
      {latlng && (
        <button
          onClick={() => setShowMap((prev) => !prev)}
          className="mt-4 px-4 py-2 bg-rose-700 text-white rounded hover:bg-pink-600 transition"
        >
          {showMap ? "❌ Hide Map" : "🗺 Show Map"}
        </button>
      )}

      {/* Similar countries */}
      {similarCountries.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            🌍 Similar Countries in {region}
          </h2>

          <div className="relative">
            {/* Scrollable container */}
            <div
              id="carousel"
              className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2"
            >
              {similarCountries.map((c) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  key={c.cca3}
                  className="min-w-[200px] bg-card text-white p-4 rounded-lg shadow hover:shadow-xl cursor-pointer"
                  onClick={() => nav(`/country/${c.cca3}`)}
                >
                  <img
                    src={c.flags.svg}
                    alt={c.name.common}
                    className="w-full h-32 object-cover mb-2 rounded"
                  />
                  <h3 className="text-lg font-bold">{c.name.common}</h3>
                  <p className="text-sm">{c.capital?.[0] || "No capital"}</p>
                </motion.div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={() =>
                document
                  .getElementById("carousel")
                  .scrollBy({ left: -220, behavior: "smooth" })
              }
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700"
            >
              ←
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("carousel")
                  .scrollBy({ left: 220, behavior: "smooth" })
              }
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full hover:bg-gray-700"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
