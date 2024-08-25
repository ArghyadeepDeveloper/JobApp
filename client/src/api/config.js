import axios from "axios";

const baseURL = "http://localhost:3000";

let token = localStorage.getItem("token");

export const axiosPublic = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const axiosPrivate = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// Axios instance for public form data requests
export const axiosPublicForm = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    "content-type": "multipart/form-data",
  },
});

// Axios instance for private form data requests
export const axiosPrivateForm = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});
