import axios from "axios";

const apiCall = import.meta.env.VITE_BACKEND_API;

const axiosConfig = axios.create({
  baseURL: `${apiCall}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${apiCall}/api/auth/refresh-token`,
          {
            refreshToken: localStorage.getItem("refresh_token"),
          }
        );

        const { token, refreshToken } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        axiosConfig.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        originalRequest.headers["Authorization"] = `Bearer ${token}`;

        return axiosConfig(originalRequest);
      } catch (err) {
        console.error("Lỗi khi làm mới token:", err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosConfig;
