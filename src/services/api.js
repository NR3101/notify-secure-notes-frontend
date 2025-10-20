import axios from "axios";

// Axios instance banaya hai with base configuration
// Yaha se saare API calls jaayenge
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Cookies ke liye zaruri hai
});

// Request interceptor - har request se pehle JWT aur CSRF token add karega
// Ye automatically authentication handle karega
api.interceptors.request.use(
  async (config) => {
    // JWT token ko localStorage se leke header me add karo
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // CSRF token fetch karo agar localStorage me nahi hai
    let csrfToken = localStorage.getItem("CSRF_TOKEN");
    if (!csrfToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/csrf-token`,
          { withCredentials: true }
        );
        csrfToken = response.data.token;
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    }

    // CSRF token ko header me add karo - security ke liye zaroori
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
