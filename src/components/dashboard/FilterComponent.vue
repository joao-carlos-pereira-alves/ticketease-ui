<template>
  <q-card class="shadow-0 row transparent">
    <q-card-section class="col-12 col-sm-12 col-md-6">
      <q-input
        outlined
        v-model="text"
        label="Procure por chamados"
        class="bg-white rounded-borders"
      >
        <template #prepend>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section class="col-12 col-sm-6 col-md-3">
      <q-input
        outlined
        v-model="text"
        label="Status"
        class="bg-white rounded-borders"
      >
        <template #prepend>
          <q-icon name="menu" color="primary" />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section class="col-12 col-sm-6 col-md-3">
      <q-select
        outlined
        v-model="text"
        label="Filtros"
        class="bg-white rounded-borders"
      >
        <template #prepend>
          <q-icon name="filter_list" color="primary" />
        </template>
      </q-select>
    </q-card-section>
    <q-card-section class="col-12 text-left q-pt-none">
      <q-chip
        v-for="i in 5"
        clickable
        color="white"
        text-color="black"
        size="lg"
        class="q-pa-md text-left q-mr-md chip-item"
      >
        <q-icon
          name="close"
          color="primary"
          size="20px"
          class="chip-item-icon q-mr-sm"
        />
        <div class="text-body1">Design</div>
      </q-chip>
      <span class="pointer">
        Remover todos
      </span>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.chip-item-icon {
  border-radius: 50%;
  background-color: var(--primary-blur);
}

.chip-item {
  border: 1px solid rgb(207, 207, 207);
}
</style>
