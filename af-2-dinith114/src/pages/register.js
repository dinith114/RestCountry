// src/pages/Register.js
import React, { useState } from "react";
import API from "../utills/api";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/GeoViewLogo2.png";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-white px-4">
      <div className="flex bg-card rounded-xl overflow-hidden shadow-lg w-full max-w-5xl">
        {/* Branding Side */}
        <div className="hidden md:flex flex-col items-center justify-center bg-[#0f172a] p-10 w-1/2">
          <img src={Logo} alt="GeoView Logo" className="w-40 h-40 mb-6" />
          <h1 className="text-4xl font-bold text-blue-400 mb-2">GeoView</h1>
          <p className="text-gray-400 text-center">
            Join GeoView to explore the world, discover new countries, and save
            your favorites.
          </p>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-300">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 rounded bg-dark border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-dark border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-dark border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
