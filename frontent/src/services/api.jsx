import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("VITE_API_URL is not configured");
}

const API = axios.create({
  baseURL: `${apiUrl.replace(/\/$/, "")}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname === "/dashboard") window.location.assign("/signin");
    }
    return Promise.reject(error);
  },
);

// data fetching functions
export const getUsers = () => {
  return API.get("/users");
};

// data posting functions
export const createUser = (userData) => {
  return API.post("/users", userData);
};

// data updating functions
export const updateUser = (id, userData) => {
  return API.put(`/users/${id}`, userData);
};

// data deleting functions
export const deleteUser = (id) => {
  return API.delete(`/users/${id}`);
};

// authentication functions
export const signupUser = (userData) => {
  return API.post("/auth/signup", userData);
};
export const signinUser = (userData) => {
  return API.post("/auth/signin", userData);
};