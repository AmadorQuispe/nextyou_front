import axios from "axios";

export const baseUrl =
  import.meta.env.VITE_BASE_URL_API || "http://localhost:8000";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
