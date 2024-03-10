<template>
  <q-drawer
    show-if-above
    :width="300"
    persistent
    :mini="$q.screen.xs || $q.screen.sm"
    :breakpoint="0"
    class="text-black text-left bg-white row"
    side="left"
    style="border-right: 2px solid var(--bg-background); overflow-x: inherit"
  >
    <div class="col-12">
      <q-card class="shadow-0 transparent">
        <q-card-section
          class="text-center text-weight-bolder text-h4"
          :class="{ 'text-h6': $q.screen.xs || $q.screen.sm }"
        >
          {{ $q.screen.xs || $q.screen.sm ? "T.E" : "TicketEase" }}
        </q-card-section>
        <q-card-section>
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item
                :class="{ active: menuItem.label === $route.name }"
                clickable
                :active="menuItem.label === $route.name"
                v-ripple
                class="q-mt-sm"
                style="border-radius: 10px"
              >
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
            </template>
            <q-item
              clickable
              v-ripple
              @click="$authentication.signOut"
              class="q-mt-sm"
              style="border-radius: 10px"
            >
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section> Sair </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-drawer>
</template>

<script>
import { ref } from "vue";

const menuList = [
  {
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    icon: "analytics",
    label: "Gráficos",
  },
  {
    icon: "settings",
    label: "Preferências",
  },
];

export default {
  setup() {
    return {
      drawer: ref(true),
      menuList,
    };
  },
};
</script>

<style scoped>
.active {
  background-color: var(--primary);
  color: white !important;
  border-radius: 10px;
}
</style>
