import axios from "axios";

// const BASE_URL = "https://notehub-api.goit.study/api";
// const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});
