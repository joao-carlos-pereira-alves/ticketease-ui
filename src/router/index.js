import { createWebHistory, createRouter } from "vue-router";
// import store from "../store";

import Login from "../views/Login/LoginView.vue";
import ConfirmAccountView from "../views/Login/ConfirmAccountView.vue";
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
    path: "/",
    name: "ConfirmationAccount",
    component: ConfirmAccountView,
    meta: {
      hideMenu: true,
      skipAuthentication: false
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
  const { _auth, user } = useAuthentication;

  if (to.meta && to.meta.skipAuthentication) {
    next();
  }
  else if (!_auth) {
    next({ name: "Login" });
  }
  else if (_auth && !user?.verified) {
    next({ name: "ConfirmationAccount" });
  }
  else {
    next();
  }
});

export default router;
