import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/ideas",
    name: "ideas",
    component: () => import("./components/IdeaList.vue"),
  },
  {
    path: "/idea/:id",
    name: "idea-details",
    component: () => import("./components/IdeaDetails.vue"),
  },
  {
    path: "/add",
    name: "add-idea",
    component: () => import("./components/AddIdea.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
