import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "https://dashaboard-aoqf.onrender.com"}/api`,
});


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