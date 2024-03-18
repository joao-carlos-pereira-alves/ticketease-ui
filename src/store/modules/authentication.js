/* eslint-disable */
import { axios } from "../../plugins/axios";
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";
import router from "../../router";
import App from "../../main.js"
import { fetchCurrentUser } from "../../api/users.js";
import { callback } from "./callbacks.js";

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
          this.handleRedirectionView(data);
        }

        this.afterLoginCallbacks();
      } catch (error) {
        return error?.response || null;
      }
    },
    async signUp(params) {
      try {
        const { data } = await axios.post("/sign_up", params);
        return data;
      } catch (error) {
        return error?.response || null;
      }
    },
    async signOut() {
      this._auth = null;

      localStorage.removeItem("_auth");

      router.push({ name: "Login" });
    },
    async verifyAccount(code) {
      try {
        const response = await axios.post("/verify_account", {
          totp_token: String(code)
        });

        if (response?.data) {
          const { data } = response?.data

          this.user = data
          this.handleRedirectionView(data);
        }

        return;
    } catch (error) {
        return error?.response || null;
      }
    },
    handleRedirectionView(user) {
      router.push({ name: "Dashboard" });
    },
    updateLoadingState(v) {
      this.loading = v;
    },
    async setCurrentUser() {
      this.user = await fetchCurrentUser();
      this.updateLoadingState(false)
    },
    async afterLoginCallbacks() {
      const useCallback = callback()
      await useCallback.call();
    }
  },
});
