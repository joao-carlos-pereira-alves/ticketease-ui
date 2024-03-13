/* eslint-disable */
import { axios } from "../../plugins/axios.js";
import { defineStore } from "pinia";
import App from "../../main.js";
import { getWorkspace as requestWorkspace } from "../../api/workspaces.js";

export const workspace = defineStore("workspace", {
  state: () => ({
    currentWorkspace: {},
    loading: false,
  }),
  getters: {},
  actions: {
    async getWorkspace(workspace_id) {
      if (!workspace_id) return;

      this.setLoading(true);
      this.currentWorkspace = await requestWorkspace(workspace_id);
      this.setLoading(false);
    },
    setLoading(v) {
      this.loading = v;
    }
  },
});