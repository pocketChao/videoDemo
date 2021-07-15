import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "VideoPlayPage",
    component: () => import("@/views/video/index.vue")
  },
  {
    path: "/draw-panel",
    name: "DrawPanel",
    component: () => import("@/views/draw-panel/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
