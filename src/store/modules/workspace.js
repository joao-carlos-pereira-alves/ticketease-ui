/* eslint-disable */
import { axios } from "../../plugins/axios.js";
import { defineStore } from "pinia";
import App from "../../main.js";

export const workspace = defineStore("workspace", {
  state: () => ({
    workspace: {},
    loading: false,
  }),
  getters: {},
  actions: {
    async getWorkspace() {
      // this.setLoading(true);
      // this.workspaceUsers = await requestWorkspaceUsers();
      // this.setLoading(false);
    },
    setLoading(v) {
      this.loading = v;
    }
  },
});