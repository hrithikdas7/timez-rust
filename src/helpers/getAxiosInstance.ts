import axios from "axios";

const PRODUCTION = process.env.ELECTRON_PRODUCTION;

const BASE_URL =
  PRODUCTION === "true"
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_STAGE;

export const getAxiosInstance = async () => {
  let token = localStorage.getItem("USER_ACCESS_TOKEN");

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
  instance.interceptors.request.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
};
