/* eslint-disable */
import { axios } from "../../plugins/axios";
import { defineStore } from "pinia";
import App from "../../main.js";
import {
  getTickets as requestTickets,
  putTicket as updateTicket,
} from "../../api/tickets.js";
import { workspace } from "./workspace.js";

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

      const { currentWorkspace } = workspace();
      const paginationParams = { ...this.pagination };
      const currentWorkspaceId = currentWorkspace.id;
      const filterParams = {
        ...this.filterParams,
        workspace_id: currentWorkspaceId,
      };
      const { tickets, pagination } = await requestTickets(
        filterParams,
        paginationParams
      );
      const { total, per_page, page } = pagination;
      const offset = total === 0 ? 1 : Math.ceil(total / per_page);

      this.tickets = tickets;
      this.pagination = {
        total: total || 0,
        per_page: per_page || 5,
        page: Number(page && page <= 0 ? 1 : page) || 1,
      };

      this.setOffSet(offset);
      this.setLoading(false);
    },
    async putTicket(params) {
      const { ticket } = await updateTicket(params);

      this.findAndChangeTicket(ticket);
    },
    findAndChangeTicket(params) {
      const currentTicketIndex = this.tickets.findIndex(
        (ticket) => ticket.id === params.id
      );

      if (currentTicketIndex !== -1) {
        Object.assign(this.tickets[currentTicketIndex], params);
      }
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
      this.offset = off_set;
    },
  },
});
