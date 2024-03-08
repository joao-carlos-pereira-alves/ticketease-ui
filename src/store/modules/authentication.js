/* eslint-disable */
import { axios } from "../../plugins/axios";
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";
import router from "../../router";
import App from "../../main.js"

export const authentication = defineStore("authentication", {
  state: () => ({
    currentUser: JSON.parse(localStorage.currentUser || "{}"),
  }),
  getters: {
    jwtPayload() {
      if (!(this.currentUser && this.currentUser.token)) return {};

      return jwtDecode(this.currentUser.token);
    },
    isJwtExpired(_state) {
      return Date.now() >= (this.jwtPayload.exp || 0) * 1000;
    },
  },
  actions: {
    async sign_in(user) {
      try {
        await axios.post("/sign_in", user);

        // this.currentUser = response.data;
        // localStorage.currentUser = JSON.stringify(this.currentUser);

        /* It's calling the `notify` method from the `Quasar` framework. */
        App._context.config.globalProperties.$q.notify({
          message: "Login realizado com sucesso",
          type: "positive",
          position: "top-right",
          timeout: 1000,
        });

        router.push({ name: "Dashboard" });
      } catch (error) {
        App._context.config.globalProperties.$q.notify({
          message: "Login ou senha inválidos",
          type: "warning",
          position: "top-right",
          timeout: 1000,
        });

        return error;
      }
    },
    async logout() {
      this.currentUser = {};

      localStorage.removeItem("currentUser");

      router.push({ name: "Login" });
    },
  },
});
