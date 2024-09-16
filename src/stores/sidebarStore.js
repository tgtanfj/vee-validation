import { defineStore } from "pinia";

export const useSideBarStore = defineStore("tab", {
  state: () => ({
    tab: "updateUser",
  }),
  actions: {
    changeTab(newTab) {
      this.tab = newTab;
    },
  },
});
