/* eslint-disable */
import { axios } from "../../plugins/axios";
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";
import router from "../../router";
import App from "../../main.js";
import { fetchCurrentUser } from "../../api/users.js";
import { callback } from "./callbacks.js";

export const authentication = defineStore("authentication", {
  state: () => ({
    _auth: localStorage?._auth || null,
    user: null,
    loading: false,
  }),
  getters: {
    async checkAndFetchUser() {
      if (this.user) return;

      this.updateLoadingState(true);
      this.setCurrentUser();
    },
  },
  actions: {
    async signIn(user) {
      try {
        const response = await axios.post("/sign_in", user);

        if (response?.data) {
          const { token, data } = response?.data;
          this.user = data;

          this.setAuthToken(token);
          this.updateLoadingState(false);
          this.handleRedirectionView(data, "Dashboard");
        }

        this.afterLoginCallbacks();
      } catch (error) {
        return error?.response || null;
      }
    },
    async signUp(params) {
      try {
        const { data } = await axios.post("/sign_up", params);
        const { token } = data;

        this.setAuthToken(token);
        this.setCurrentUser(true);

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
          totp_token: String(code),
        });

        if (response?.data) {
          const { data } = response?.data;

          this.user = data;
          this.handleRedirectionView(data);
          this.afterLoginCallbacks();
        }

        return response;
      } catch (error) {
        return error?.response || null;
      }
    },
    async resendVerifyToken() {
      try {
        await axios.post("/resend_verification_code");
        return;
      } catch (error) {
        return error?.response || null;
      }
    },
    setAuthToken(token) {
      this._auth = token;
      localStorage._auth = this._auth;
    },
    handleRedirectionView(currentUser, router_name, is_sign_up = false) {
      const currentRouterName = router?.currentRoute?.value?.name || null;

      if (currentUser?.verified && currentRouterName == "ConfirmationAccount") {
        router.push({ name: "Dashboard" });
      } else if (is_sign_up) {
        router.push({ name: "ConfirmationAccount" });
      } else if (!currentUser?.verified && currentRouterName != "Login") {
        router.push({ name: "ConfirmationAccount" });
      } else if (router_name) {
        router.push({ name: router_name });
      }
    },
    updateLoadingState(v) {
      this.loading = v;
    },
    async setCurrentUser(is_sign_up = false) {
      this.user = await fetchCurrentUser();
      this.handleRedirectionView(this.user, false, is_sign_up);
      this.updateLoadingState(false);
    },
    async afterLoginCallbacks() {
      const useCallback = callback();
      await useCallback.call();
    },
  },
});
