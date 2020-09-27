import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Transition",
    component: () => import("@/views/video/index.vue")
  },
  {
    path: "/video",
    name: "VideoPlayPage",
    component: () => import("@/views/video/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
