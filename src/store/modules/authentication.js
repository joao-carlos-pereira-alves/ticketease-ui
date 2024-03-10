/* eslint-disable */
import { axios } from "../../plugins/axios";
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";
import router from "../../router";
import App from "../../main.js"
import { fetchCurrentUser } from "../../api/users.js";

export const authentication = defineStore("authentication", {
  state: () => ({
    _auth: localStorage?._auth || null,
    user: null,
    loading: false
  }),
  getters: {
    async checkAndFetchUser() {
      if (this.user) return;

      this.updateLoadingState(true);
      this.setCurrentUser();
    }
  },
  actions: {
    async signIn(user) {
      try {
        const response = await axios.post("/sign_in", user);

        if (response?.data) {
          const { token, data } = response?.data

          this._auth = token
          this.user  = data

          localStorage._auth = this._auth;

          this.updateLoadingState(false);
        }

        router.push({ name: "Dashboard" });
      } catch (error) {
        return error?.response || null;
      }
    },
    async signOut() {
      this._auth = null;

      localStorage.removeItem("_auth");

      router.push({ name: "Login" });
    },
    updateLoadingState(v) {
      this.loading = v;
    },
    async setCurrentUser() {
      this.user = await fetchCurrentUser();
      this.updateLoadingState(false)
    }
  },
});
