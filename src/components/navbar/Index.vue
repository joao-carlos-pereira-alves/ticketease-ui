<template>
  <q-header elevated>
    <div class="q-pa-md q-gutter-y-sm bg-white">
      <q-toolbar class="text-primary">
        <q-space></q-space>
        <q-btn-dropdown
          dense
          rounded
          flat
          icon="notifications_none"
          fab-mini
          color="black"
        >
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Photos</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown flat text-color="black" :label="$authentication?.user?.name || 'Indefinido'" :loading="$authentication.loading">
          <q-list>
            <q-item clickable v-close-popup @click="$authentication.signOut">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section> Sair </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </div>
  </q-header>
</template>

<script setup>
</script>

<style scoped></style>
