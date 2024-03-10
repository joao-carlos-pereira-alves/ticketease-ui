<template>
  <q-page padding class="q-pa-sm">
    <div class="default-page row">
      <div class="col-12 text-h6 text-weight-bold text-left q-pl-md">
        Dashboard
      </div>
      <div class="col-12">
        <FilterComponent />
      </div>
      <div class="col-12 q-mt-md">
        <TicketComponent />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import FilterComponent from '../../components/dashboard/FilterComponent.vue';
import TicketComponent from '../../components/dashboard/TicketComponent.vue';
</script>

<style scoped>
</style>
