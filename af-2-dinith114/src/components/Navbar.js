// src/components/Navbar.js
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "../assets/GeoViewLogo2.png";

import {
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiHeart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-dark text-black dark:text-white shadow-md transition-colors duration-300">
      <div className="max-w-7x2 mx-7 px-6 py-4 flex items-center justify-between">
        {/* Logo + name */}
        <Link
          to="/"
          className="flex items-center space-x-2 font-bold text-3xl text-black dark:text-white hover:text-blue-400"
        >
          <img
            src={Logo}
            alt="GeoView Logo"
            className="w-14 h-14 animate-spin-slow hover:animate-spin"
          />
          <span>GeoView</span>
        </Link>

        {/* Hamburger on mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
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
                className="flex items-center gap-1 hover:text-pink-400 transition"
              >
                <FiHeart /> Favorites
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

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-xl"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-400" />
            )}
            Toggle Theme
          </button>

          {user ? (
            <>
              <Link
                to="/favorites"
                className="flex items-center gap-2 hover:text-pink-400"
                onClick={() => setMenuOpen(false)}
              >
                <FiHeart /> Favorites
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full"
              >
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full bg-blue-600 text-white px-4 py-2 rounded-full"
              >
                <FiLogIn /> Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block w-full bg-green-600 text-white px-4 py-2 rounded-full"
              >
                <FiUserPlus /> Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
