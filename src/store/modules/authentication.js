/* eslint-disable */
import { axios } from "../../plugins/axios";
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";
import router from "../../router";
import App from "../../main.js"

export const authentication = defineStore("authentication", {
  state: () => ({
    _auth: localStorage?._auth || null
  }),
  getters: {
    jwtPayload() {
      if (!this._auth) return {};

      return jwtDecode(this._auth);
    },
    isJwtExpired(_state) {
      return Date.now() >= (this.jwtPayload.exp || 0) * 1000;
    }
  },
  actions: {
    async signIn(user) {
      try {
        const response = await axios.post("/sign_in", user);

        if (response?.data?.token) {
          this._auth = response.data.token
          localStorage._auth = this._auth;
        }

        router.push({ name: "Dashboard" });
      } catch (error) {
        return error?.response || null;
      }
    },
    async logout() {
      this._auth = null;

      localStorage.removeItem("_auth");

      router.push({ name: "Login" });
    },
  },
});
