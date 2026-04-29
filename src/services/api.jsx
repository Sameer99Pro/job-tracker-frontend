/* eslint-disable react-refresh/only-export-components */

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// AUTH
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

// APPLICATION
export const addApplication = (data) => API.post("/applications", data);

export const getUserApplications = (userId) =>
  API.get(`/applications/user/${userId}`);

export const deleteApplication = (id) =>
  API.delete(`/applications/${id}`);

export const updateApplication = (id, data) =>
  API.put(`/applications/${id}`, data);

export const getStats = () => API.get("/applications/stats");

export const getConversion = () => API.get("/applications/conversion");

export const filterApplications = (status) =>
  API.get(`/applications/filter?status=${status}`);

export const searchApplications = (q) =>
  API.get(`/applications/search?q=${q}`);

export default API;