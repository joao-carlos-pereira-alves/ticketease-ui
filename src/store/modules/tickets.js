/* eslint-disable */
import { axios } from "../../plugins/axios";
import { defineStore } from "pinia";
import App from "../../main.js";
import { getTickets as requestTickets } from "../../api/tickets.js";

export const ticket = defineStore("ticket", {
  state: () => ({
    tickets: [],
    loading: false,
    pagination: {
      total: 0,
      per_page: 5,
      page: 1,
    },
    offset: 0,
    filterParams: {},
    orderBy: "inserted_at_desc",
  }),
  getters: {},
  actions: {
    async getTickets() {
      this.setLoading(true);

      const paginationParams          = { ...this.pagination };
      const filterParams              = { ...this.filterParams };
      const { tickets, pagination }   = await requestTickets(filterParams, paginationParams);
      const { total, per_page, page } = pagination;
      const offset                    = total === 0 ? 1 : Math.ceil(total / per_page)

      this.tickets = tickets;
      this.pagination = {
        total: total || 0,
        per_page: per_page || 5,
        page: Number((page && page <= 0 ? 1 : page)) || 1
      };

      this.setOffSet(offset)
      this.setLoading(false);
    },
    setLoading(v) {
      this.loading = v;
    },
    setOrder(order) {
      this.orderBy = order;
    },
    setFilterParams(filter_params) {
      this.filterParams = filter_params;
    },
    setOffSet(off_set) {
      this.offset = off_set
    }
  },
});
