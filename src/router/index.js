import { createWebHistory, createRouter } from "vue-router";
// import store from "../store";

import Login from "../views/Login/LoginView.vue";
import Dashboard from "../views/Dashboard/DashboardView.vue";

import App from "../main.js"

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      hideMenu: true,
      skipAuthentication: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      skipAuthentication: true,
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global before guard to redirect user to the login page when authentication is needed
router.beforeResolve((to, _from, next) => {
  if (to.meta && to.meta.skipAuthentication) {
    next();
  }
  else if (App._context.config.globalProperties.$authentication.isJwtExpired) {
    next({ name: "Login" });
  }
  else {
    next();
  }
});

export default router;
