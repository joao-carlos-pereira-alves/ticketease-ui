<template>
  <q-header elevated>
    <div class="q-pa-md q-gutter-y-sm bg-white">
      <q-toolbar class="text-primary">
        <div class="row items-center text-left">
          <div class="col-12 text-weight-bold q-mb-xs" v-if="!$q.screen.xs">Área de Trabalho Atual</div>
          <div class="col-12">
            <q-btn-dropdown
              color="black"
              push
              no-caps
              outline
              icon="workspaces"
              @click="onMainClick"
              transition-show="slide-down"
              menu-anchor="bottom middle"
              :label="$workspace.currentWorkspace.title"
              menu-self="top middle"
              :menu-offset="[5, 5]"
            >
              <q-card class="shadow-0">
                <q-card-section> Suas Áreas de Trabalho </q-card-section>
                <q-card-section class="q-pa-none">
                  <q-separator></q-separator>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <q-list class="text-left">
                    <q-item
                      v-for="workspaceUser in $workspaceUser.workspaceUsers"
                      clickable
                      v-close-popup
                      @click="
                        changeWorkspace(workspaceUser?.workspace?.id || null)
                      "
                    >
                      <q-item-section>
                        <div class="">
                          <q-icon
                            :name="
                              workspaceUser?.workspace?.id ==
                              $workspace?.currentWorkspace?.id
                                ? 'radio_button_checked'
                                : 'radio_button_unchecked'
                            "
                            :color="
                              workspaceUser?.workspace?.id ==
                              $workspace?.currentWorkspace?.id
                                ? 'primary'
                                : 'grey'
                            "
                            class="q-mr-sm"
                          />
                          {{ workspaceUser?.workspace?.title || "-" }}
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-btn-dropdown>
          </div>
        </div>
        <q-space></q-space>
        <q-btn-dropdown
          dense
          rounded
          flat
          icon="notifications_none"
          fab-mini
          color="black"
          :menu-offset="[5, 5]"
        >
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Photos</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown
          flat
          text-color="black"
          :label="$q.screen.xs ? $authentication?.user?.name.charAt(0) : $authentication?.user?.name || 'Indefinido'"
          :loading="$authentication.loading"
          :menu-offset="[5, 5]"
        >
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
import { workspace } from "../../store/modules/workspace";

const useWorkspace = workspace();

const changeWorkspace = async (workspace_id) => {
  const currentWorkspace = useWorkspace.currentWorkspace;
  const isCurrent = workspace_id == currentWorkspace.id;

  if (!workspace_id || isCurrent) return;

  await useWorkspace.getWorkspace(workspace_id, true);
};
</script>

<style scoped></style>
