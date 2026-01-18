import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token); // 👈 DEBUG
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log("Authorization header set:", req.headers.Authorization); // 👈 DEBUG
  }
  return req;
});

export default API;
