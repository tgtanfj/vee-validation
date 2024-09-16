import { defineStore } from "pinia";

export const useDarkModeStore = defineStore("darkMode", {
  state: () => ({
    darkMode: localStorage.getItem("darkmode") || false,
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem("darkmode", this.darkMode);
    },
  },
});
