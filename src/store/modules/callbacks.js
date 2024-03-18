/* eslint-disable */
import { axios } from "../../plugins/axios.js";
import { defineStore } from "pinia";
import App from "../../main.js";

import { authentication } from "./authentication.js";
import { workspaceUser } from "./workspace_users.js";
import { ticket } from "./tickets.js";

export const callback = defineStore("callback", {
  state: () => ({}),
  getters: {},
  actions: {
    async call() {
      try {
        const useAuthentication = authentication();
        const { checkAndFetchUser } = authentication();
        const { getWorkspaceUsers } = workspaceUser();
        // const { getTickets } = ticket();

        await checkAndFetchUser;

        const currentUser = useAuthentication.user;

        if (currentUser?.verified) {
          await getWorkspaceUsers();
        }
        // await getTickets();
      } catch (error) {
        console.error("Erro ao executar ação call:", error);
      }
    },
    async onChangeWorkspace() {
      try {
        const { getTickets } = ticket();
        await getTickets();
      } catch (error) {
        console.error("Erro ao executar ação onChangeWorkspace:", error);
      }
    }
  },
});
