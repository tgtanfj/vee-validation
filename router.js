// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import Home from "@/components/Home.vue";
import PageNotFound from "@/components/PageNotFound.vue";
import { useUserStore } from "@/stores/userStore";

const routes = [
  {
    path: "/",
    redirect: "/sign-in",
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
    meta: { requiresGuest: true },
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
    meta: { requiresGuest: true },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
    meta: { requiresGuest: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated;

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next("/sign-in");
  } else if (
    to.matched.some((record) => record.meta.requiresGuest) &&
    isAuthenticated
  ) {
    next("/home");
  } else {
    next();
  }
});

export default router;
