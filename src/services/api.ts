import axios from "axios";

export const api = axios.create({
  baseURL: "https://parking-car-api.onrender.com"
})