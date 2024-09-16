import { defineStore } from "pinia";

export const useDarkModeStore = defineStore("darkMode", {
  state: () => ({
    darkMode: JSON.parse(localStorage.getItem("darkmode")) || false,
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem("darkmode", JSON.stringify(this.darkMode));
    },
  },
});
