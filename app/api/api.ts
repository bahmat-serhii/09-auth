import axios from "axios";

export const api = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});

// const BASE_URL = "https://notehub-public.goit.study/api";
// const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
