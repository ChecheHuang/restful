import Vue from "vue";
import Router from "vue-router";
import Home from "@/layout/Home.vue"
Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "/user", component: Home },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/Test.vue"),
    },
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "user",
          name: "user",
          component: () => import("@/views/User.vue"),
        },
        {
          path: "list",
          name: "list",
          component: () => import("@/views/Cus"),
        },
        {
          path: "list2",
          name: "list2",
          component: () => import("@/views/Cus/index2.vue"),
        },
        {
          path: "vue3",
          name: "vue3",
          component: () => import("@/views/Cus/vue3.vue"),
        },
      ],
    },
    {
      path: "*",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
  mode: "history",
});
