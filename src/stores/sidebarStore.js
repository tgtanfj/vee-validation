import { defineStore } from "pinia";

export const useSideBarStore = defineStore("tab", {
  state: () => ({
    tab: "allUsers",
  }),
  actions: {
    changeTab(newTab) {
      this.tab = newTab;
    },
  },
});
