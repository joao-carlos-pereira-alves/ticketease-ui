/* eslint-disable */
import { axios } from "../../plugins/axios.js";
import { defineStore } from "pinia";
import App from "../../main.js";
import { getWorkspaceUsers as requestWorkspaceUsers } from "../../api/workspace_users.js";
import { workspace } from "./workspace.js";

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
      this.setCurrentWorkspace();
    },
    setLoading(v) {
      this.loading = v;
    },
    async setCurrentWorkspace() {
      const firstWorkspaceId = this?.workspaceUsers?.[0]?.workspace?.id

      if (firstWorkspaceId) {
        const { getWorkspace } = workspace();
        await getWorkspace(firstWorkspaceId);
      }
    }
  },
});