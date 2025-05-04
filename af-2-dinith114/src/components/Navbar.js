// src/components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "../assets/GeoViewLogo2.png"; // adjust path if needed

import { FiLogOut, FiLogIn, FiUserPlus, FiHeart } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-dark text-black dark:text-white shadow-md transition-colors duration-300">
      <div className="max-w-8x1 mx-auto px-8 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 font-bold text-4xl text-black dark:text-white hover:text-blue-400 transition"
        >
          <img
            src={Logo}
            alt="GeoView Logo"
            className="w-15 h-16 animate-spin-slow hover:animate-spin"
          />
          <span>GeoView</span>
        </Link>

        <div className="space-x-4 flex items-center">
          {/* 🌙 Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Toggle Theme"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-400" />
            )}
          </button>

          {user ? (
            <>
              <Link
                to="/favorites"
                className="flex items-center gap-1 text-white dark:text-white hover:text-pink-400 transition"
              >
                <FiHeart />
                Favorites
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full shadow hover:shadow-md transition font-semibold"
              >
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 rounded-full shadow hover:shadow-md transition font-semibold"
              >
                <FiLogIn />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-full shadow hover:shadow-md transition font-semibold"
              >
                <FiUserPlus />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
