/* eslint-disable */
"use strict";

import { createApp } from "vue";
import axios from "axios";
import { authentication } from "../store/modules/authentication";
import router from "../router";

export const API_URL = "http://localhost:4000" || "backend port";

import App from "../main.js";

const addAuthorizationToken = (data, headers) => {
  const useAuthentication = authentication();
  const _auth = useAuthentication._auth;

  if (_auth) {
    headers.Authorization = `Bearer ${_auth}`;
  }

  if (data instanceof FormData) return data;

  return JSON.stringify(data);
};

const config = {
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: addAuthorizationToken,
};

const _axios = axios.create(config);

let pendingRequest = null;

const debounceInterceptor = (config) => {
  if (pendingRequest) {
    clearTimeout(pendingRequest);
  }

  return new Promise((resolve) => {
    pendingRequest = setTimeout(() => {
      resolve(config);
    }, 200);
  });
};

_axios.interceptors.request.use(
  async (config) => {
    const useAuthentication = authentication();
    const _auth = useAuthentication._auth;

    if (!_auth) {
      useAuthentication.signOut()
      delete config.headers.Authorization;
    }
    return debounceInterceptor(config);
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
    const useAuthentication = authentication();

    switch (error.response.status) {
      case 401:
        useAuthentication.signOut()
        break;
      default:
        router.replace({
          path: "/",
        });
    }
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
