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
