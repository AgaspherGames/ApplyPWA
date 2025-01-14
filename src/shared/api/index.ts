import axios from "axios";
import { SessionService } from "../utils/SessionService";

const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {},
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = SessionService.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
