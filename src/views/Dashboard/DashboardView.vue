<template>
  <q-page padding class="q-pa-sm">
    <TicketDialogComponent
      :ticket="selectedTicket.ticket"
      v-model:open="selectedTicket.open"
      v-if="selectedTicket.open"
    />
    <div class="default-page row">
      <div class="col-12 text-h6 text-weight-bold text-left q-pl-md" v-if="$workspace?.currentWorkspace">
        Área de Trabalho
      </div>
      <div class="col-12" v-if="$workspace?.currentWorkspace">
        <FilterComponent />
      </div>
      <div class="col-12 q-mt-md" v-if="$workspace?.currentWorkspace">
        <TicketComponent @select-filter="setSelectedTicket" />
      </div>
      <div class="col-12 q-mt-md" v-else>
        <NoWorkspaceComponent />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import FilterComponent from "../../components/dashboard/FilterComponent.vue";
import TicketComponent from "../../components/dashboard/TicketComponent.vue";
import TicketDialogComponent from "../../components/dashboard/TicketDialogComponent.vue";
import NoWorkspaceComponent from "../../components/dashboard/NoWorkspaceComponent.vue";
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
