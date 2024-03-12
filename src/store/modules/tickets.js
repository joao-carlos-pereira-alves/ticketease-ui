/* eslint-disable */
import { axios } from "../../plugins/axios";
import { defineStore } from "pinia";
import App from "../../main.js"
import { getTickets as requestTickets } from "../../api/tickets.js"

export const ticket = defineStore("ticket", {
  state: () => ({
    tickets: [],
    loading: false,
    pagination: {
      total: 0,
      per_page: 5,
      page: 1
    },
    orderBy: 'inserted_at_desc'
  }),
  getters: {
  },
  actions: {
    async getTickets(filter_params = null) {
      this.setLoading(true);

      const { tickets, pagination } = await requestTickets(filter_params);

      this.tickets = tickets;
      console.log('aaa', pagination)
      this.pagination = pagination;

      this.setLoading(false);
    },
    setLoading(v) {
      this.loading = v
    },
    setOrder(order) {
      this.orderBy = order
    }
  },
});
