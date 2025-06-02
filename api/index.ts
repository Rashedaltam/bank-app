import axios, { AxiosHeaders } from "axios";
import { getToken } from "./store";

export const instance = axios.create({
  baseURL: "https://react-bank-project.eapi.joincoded.com",
});

// instance.interceptors.request.use(
//   async (config) => {
//     const token = await getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log("API Error:", error.response?.status, error.response?.data);
//     return Promise.reject(error);
//   }
// );

instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (!config.headers) {
      config.headers = AxiosHeaders.from({});
    }

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
