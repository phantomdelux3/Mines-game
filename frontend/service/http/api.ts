import axios from "axios";

const productionBaseUrl = "https://backend-production.krishnakmar-005.workers.dev";

const http = axios.create({
  baseURL: productionBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": productionBaseUrl,
  },
  timeout: 10000,
});
http.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
