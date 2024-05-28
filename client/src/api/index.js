import axios from "axios";
import CONSTANTS from "../constants";

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_SERVER_URL,
});

let accessToken = null;

export const clearToken = () => {
  accessToken = null;
  localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
};

// Добавляем перехват запросов
httpClient.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // Здесь можете сделать что-нибудь с перед отправкой запроса
    return config;
  },
  function (error) {
    // Сделайте что-нибудь с ошибкой запроса
    return Promise.reject(error);
  }
);

// Добавляем перехват ответов
httpClient.interceptors.response.use(
  function (response) {
    if (response?.data?.data?.tokenPair) {
      const { tokenPair } = response.data.data;

      accessToken = tokenPair.accessToken;

      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenPair.refreshToken);
    }
    return response;
  },
  async function (error) {
    const {
      response: { status },
    } = error;

    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (refreshTokenFromLS && status === 419) {
      const {
        data: {
          data: { tokenPair },
        },
      } = await axios.post(`${CONSTANTS.HTTP_SERVER_URL}/auth/refresh`, {
        refreshToken: refreshTokenFromLS,
      });

      accessToken = tokenPair.accessToken;

      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, tokenPair.refreshToken);

      error.config.headers["Authorization"] = `Bearer ${accessToken}`;

      return httpClient.request(error.config);
    }
    return Promise.reject(error);
  }
);

export const login = (userData) => httpClient.post("auth/login", userData);
export const registartion = (userData) =>
  httpClient.post("auth/registartion", userData);
export const refresh = (refreshToken) =>
  httpClient.post("auth/refresh", { refreshToken });
