import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_ENV,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// eslint-disable-next-line react-refresh/only-export-components
export default API;
