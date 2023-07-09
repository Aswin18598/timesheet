import axios from "axios";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.status === 201) {
      if (response?.data?.code === "401") {
      } else {
        return Promise.reject({ response: response });
      }
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
