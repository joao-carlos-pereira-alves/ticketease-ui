/* eslint-disable */
import { axios } from "../../plugins/axios";
import { defineStore } from "pinia";
import App from "../../main.js"
import { getTickets as requestTickets } from "../../api/tickets.js"

export const ticket = defineStore("ticket", {
  state: () => ({
    tickets: []
  }),
  getters: {
  },
  actions: {
    async getTickets() {
      this.tickets = await requestTickets();
    }
  },
});
