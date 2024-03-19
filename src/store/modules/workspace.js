/* eslint-disable */
import { axios } from "../../plugins/axios.js";
import { defineStore } from "pinia";
import App from "../../main.js";
import { getWorkspace as requestWorkspace, createWorkspace as requestCreateWorkspace } from "../../api/workspaces.js";
import { callback } from "./callbacks.js";

export const workspace = defineStore("workspace", {
  state: () => ({
    currentWorkspace: null,
    loading: false,
  }),
  getters: {},
  actions: {
    async createWorkspace(params) {
      try {
        await requestCreateWorkspace(params);
      } catch (error) {
        return error?.response
      }
    },
    async getWorkspace(workspace_id, changed = false) {
      if (!workspace_id) return;

      this.setLoading(true);
      this.currentWorkspace = await requestWorkspace(workspace_id);

      this.afterChangeWorkspace();

      this.setLoading(false);
    },
    setLoading(v) {
      this.loading = v;
    },
    async afterChangeWorkspace() {
      const { onChangeWorkspace } = callback();
      const currentWorkspaceId = this.currentWorkspace.id

      await onChangeWorkspace(currentWorkspaceId);
    }
  },
});