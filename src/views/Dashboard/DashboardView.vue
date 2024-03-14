<template>
  <q-page padding class="q-pa-sm">
    <TicketDialogComponent
      :ticket="selectedTicket.ticket"
      v-model:open="selectedTicket.open"
      v-if="selectedTicket.open"
    />
    <div class="default-page row">
      <div class="col-12 text-h6 text-weight-bold text-left q-pl-md">
        Dashboard
      </div>
      <div class="col-12">
        <FilterComponent />
      </div>
      <div class="col-12 q-mt-md">
        <TicketComponent @select-filter="setSelectedTicket" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import FilterComponent from "../../components/dashboard/FilterComponent.vue";
import TicketComponent from "../../components/dashboard/TicketComponent.vue";
import TicketDialogComponent from "../../components/dashboard/TicketDialogComponent.vue";
import { ref } from "vue";

const selectedTicket = ref({
  ticket: null,
  open: false,
});

const setSelectedTicket = (ticket) => {
  selectedTicket.value = {
    open: true,
    ticket: ticket,
  };
};

const clearSelectedTicket = () => {
  selectedTicket.value = {
    ticket: null,
    open: false,
  };
};
</script>

<style scoped></style>
