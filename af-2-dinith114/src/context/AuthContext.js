// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import API from "../utills/api";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setFavorites([]);
    toast("Logged out 👋");
    window.location.href = "/";
  };

  const fetchFavorites = async () => {
    try {
      const res = await API.get("/favorites");
      setFavorites(res.data || []);
    } catch (err) {
      console.error("Error fetching favorites", err);
    }
  };

  const toggleFavorite = async (code, name = code) => {
    try {
      const res = await API.post(`/favorites/${code}`);
      const updated = res.data;
      const added = updated.includes(code) && !favorites.includes(code);
      const removed = !updated.includes(code) && favorites.includes(code);
      setFavorites(updated);
      if (added) toast.success(`${name} added to favorites ❤️`);
      else if (removed) toast(`${name} removed ❌`, { icon: "❌" });
    } catch (err) {
      toast.error("Error updating favorites");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, favorites, toggleFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
};
