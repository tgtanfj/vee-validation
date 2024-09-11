// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import Home from "@/components/Home.vue";
import PageNotFound from "@/components/PageNotFound.vue";

const routes = [
  {
    path: "/",
    redirect: '/sign-in'
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
