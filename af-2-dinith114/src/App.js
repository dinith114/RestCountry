import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";
import { fetchAllCountries } from "./services/countryService";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import Favorites from "./pages/Favorites";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCountries()
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CountryList countries={countries} />} />
        <Route path="/country/:code" element={<CountryDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
