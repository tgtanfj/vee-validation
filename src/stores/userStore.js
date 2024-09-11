import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    token: "",
    refreshToken: "",
  }),
  actions: {
    setUser(userData, token, refreshToken) {
      this.user = userData;
      this.token = token;
      this.refreshToken = refreshToken;
    },
  },
});
