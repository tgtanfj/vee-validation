import "./assets/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "../router";
import { createPinia } from "pinia";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const app = createApp(App);

const pinia = createPinia();

app.use(VueQueryPlugin, {
  queryClient,
});
app.use(router);
app.use(pinia);
app.mount("#app");
