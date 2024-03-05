/* eslint-disable */
"use strict";

import { createApp } from "vue";
import axios from "axios";
import { authentication } from "../store/modules/authentication";
import router from "../router";

export const API_URL = "http://localhost:3000" || "backend port";

import App from "../main.js";

const addAuthorizationToken = (data, headers) => {
  const useAuthentication = authentication();
  const currentUser = useAuthentication.currentUser;

  if (currentUser && currentUser.token) {
    headers.Authorization = `Bearer ${currentUser.token}`;
  }

  if (data instanceof FormData) return data;

  return JSON.stringify(data);
};

const config = {
  baseURL: `${API_URL}/api/v1`,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: addAuthorizationToken,
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (config) => {
    if (App._context.config.globalProperties.$authentication.isJwtExpired) {
      localStorage.removeItem("currentUser");
      config.headers.Authorization = "";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    console.warn("Api request error\n", error);
    // switch (error.response.status) {
    //     case 401:
    //         store.dispatch("authentication/logout");
    //         router.replace({
    //             path: "/",
    //             query: { redirect: router.currentRoute.fullPath },
    //         });
    //         break;
    //     case 403:
    //         store.dispatch("authentication/logout");
    //         router.replace({
    //             path: "/",
    //             query: { redirect: router.currentRoute.fullPath },
    //         });
    //         break;
    // }
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, options) {
  Vue.config.globalProperties.$axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.config.globalProperties.$axios, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

createApp().use(Plugin);

export default Plugin;

export { _axios as axios };
