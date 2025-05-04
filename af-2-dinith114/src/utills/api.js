import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

// Add JWT token to every request if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers["x-auth-token"] = token;
  }
  return req;
});

export default API;
