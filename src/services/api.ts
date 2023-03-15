import axios from "axios";

export const api = axios.create({
  baseURL: "https://parking-car-api.onrender.com"
  // baseURL: "http://127.0.0.1:3000",
});
