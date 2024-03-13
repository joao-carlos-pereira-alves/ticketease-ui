/* eslint-disable */
import { axios } from "../../plugins/axios.js";
import { defineStore } from "pinia";
import App from "../../main.js";
import { getWorkspaceUsers as requestWorkspaceUsers } from "../../api/workspace_users.js";

export const workspaceUser = defineStore("workspaceUser", {
  state: () => ({
    workspaceUsers: [],
    loading: false,
  }),
  getters: {},
  actions: {
    async getWorkspaceUsers() {
      this.setLoading(true);
      this.workspaceUsers = await requestWorkspaceUsers();
      this.setLoading(false);
    },
    setLoading(v) {
      this.loading = v;
    }
  },
});