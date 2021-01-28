import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/new-post",
    name: "NewPost",
    component: () => import("../views/CreateNewPost.vue"),
  },
  {
    path: "/user/:id",
    name: "User",
    component: () => import("../views/User.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
