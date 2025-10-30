import axios from "axios";




export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor: automatically attach token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token"); // get JWT from browser storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
