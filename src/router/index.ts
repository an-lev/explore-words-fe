import ModulesView from "@/views/Modules.vue";
import ModuleDetails from "@/views/ModuleDetails.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Exercises from "../views/Exercises.vue";
import Exercise from "../views/Exercise.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/modules/:id",
    name: "module",
    component: ModuleDetails
  },
  {
    path: "/modules",
    name: "modules",
    component: ModulesView,
  },
  {
    path: "/exercises/:id",
    name: "exercise",
    component: Exercise,
  },
  {
    path: "/exercises",
    name: "exercises",
    component: Exercises,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
