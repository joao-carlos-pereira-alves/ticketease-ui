import { createWebHistory, createRouter } from "vue-router";
// import store from "../store";

import Login from "../views/Login/LoginView.vue";
import Dashboard from "../views/Dashboard/DashboardView.vue";
import App from "../main.js"
import { authentication } from "../store/modules/authentication.js";

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
      skipAuthentication: false,
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global before guard to redirect user to the login page when authentication is needed
router.beforeResolve((to, _from, next) => {
  const useAuthentication = authentication();

  if (to.meta && to.meta.skipAuthentication) {
    next();
  }
  else if (!useAuthentication?._auth) {
    next({ name: "Login" });
  }
  else {
    next();
  }
});

export default router;
