<template>
  <div class="row q-px-md">
    <div
      class="col-12 row items-center justify-between q-px-sm q-pb-sm text-caption"
    >
      <div class="col text-left">
        Foram encontrados
        <span
          style="color: var(--primary)"
          class="text-body2 text-weight-medium"
          >34</span
        >
        chamados
      </div>
      <div class="col text-right">
        Ordenar por:
        <q-btn-dropdown class="q-ml-xs" dense flat color="primary" label="Date">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Photos</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <div class="col-12">
      <q-card v-for="i in 4" style="border-radius: 15px">
        <q-card-section class="row q-mb-md">
          <div class="col-2 col-sm-1 icon-card rounded-borders row items-center justify-center">
            <q-icon size="lg" name="bug_report" />
          </div>
          <div
            class="col text-subtitle2 text-weight-bold text-left q-px-md row"
          >
            <div class="col-12">
              <span class=""> Meu primeiro chamado! </span>
              <span v-if="!$q.screen.xs">
                <q-chip
                  v-for="i in 2"
                  clickable
                  style="background-color: var(--primary-blur)"
                  text-color="black"
                  size="md"
                  class="rounded-borders q-mx-sm"
                >
                  <div class="text-primary">Design</div>
                </q-chip>
              </span>
            </div>
            <div class="col-12 text-grey">
              <small>Uma descrição</small>
            </div>
          </div>
          <q-space></q-space>
          <div class="col text-right">
            <small class="text-caption">2 days ago</small>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.icon-card {
  background-color: var(--primary-blur);
  color: var(--primary);
}
</style>
