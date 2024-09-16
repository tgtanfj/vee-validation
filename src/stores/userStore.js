import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    refreshToken: localStorage.getItem("refresh_token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {},
    isAuthenticated: localStorage.getItem("token") ? true : false,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken;
      localStorage.setItem("refresh_token", refreshToken);
    },
    setUser(userInfo) {
      if (userInfo) {
        this.user = userInfo;
        localStorage.setItem("user", JSON.stringify(userInfo));
      } else {
        console.error("User info is undefined");
      }
    },
    setIsAuth(value) {
      this.isAuthenticated = value;
    },
    clearUser() {
      this.token = "";
      this.refreshToken = "";
      this.user = {};
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
  },
});
