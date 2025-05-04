import React, { useState, useContext } from "react";
import API from "../utills/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext"; // <-- ADD THIS
import Logo from "../assets/GeoViewLogo2.png";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // <-- ADD THIS

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-all ${
        theme === "dark" ? "bg-dark text-white" : "bg-light text-gray-900"
      }`}
    >
      <div
        className={`flex rounded-xl overflow-hidden shadow-lg w-full max-w-5xl ${
          theme === "dark" ? "bg-card" : "bg-white"
        }`}
      >
        {/* Branding Section */}
        <div
          className={`hidden md:flex flex-col items-center justify-center p-10 w-1/2 ${
            theme === "dark" ? "bg-[#0f172a]" : "bg-gray-100"
          }`}
        >
          <img src={Logo} alt="GeoView Logo" className="w-40 h-40 mb-6" />
          <h1 className="text-4xl font-bold text-blue-400 mb-2">GeoView</h1>
          <p className="text-center text-sm text-gray-400 dark:text-gray-300">
            Explore the world. Discover countries. Save your favorites.
          </p>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-500 dark:text-blue-300">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === "dark"
                  ? "bg-dark border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === "dark"
                  ? "bg-dark border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
            >
              Log In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
