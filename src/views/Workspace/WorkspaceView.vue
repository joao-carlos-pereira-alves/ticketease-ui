<template>
  <q-page padding class="q-pa-sm">
    <div class="default-page row q-gutter-lg">
      <CreateWorkspaceComponent @submit="getWorkspaces" v-if="newWorkspaceDialog?.open" v-model:open="newWorkspaceDialog.open" />
      <div class="col-12">
        <q-toolbar class="q-px-none">
          <div class="">
            <div class="text-h6 text-weight-bold text-left">
              Suas Áreas de Trabalho
            </div>
            <small>
              Áreas de trabalho criadas por você e nas quais está participando.
            </small>
          </div>
          <q-space></q-space>
          <q-btn color="primary" @click="openNewWorkspaceDialog"> Criar área de trabalho </q-btn>
        </q-toolbar>
      </div>
      <div class="col-12">
        <q-table
          :rows="workspacesRows"
          :columns="tableColumns"
          row-key="name"
          no-data-label="Nenhuma área de trabalho encontrada"
          hide-pagination
          :loading="loading"
          color="primary"
          separator="cell"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="title" :props="props">
                {{ props.row.title }}
              </q-td>
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>
              <q-td key="options" :props="props">
                <q-icon name="visibility" size="sm" class="pointer"></q-icon>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="col-12 row justify-center">
        <q-pagination
          v-model="paginationParams.page"
          :max="paginationParams.offset"
          direction-links
          push
          color="second"
          active-design="push"
          active-color="primary"
          @update:model-value="getWorkspaces"
          v-if="workspacesRows?.length"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getAllWorkspace } from "../../api/workspaces";
import CreateWorkspaceComponent from "../../components/workspace/createWorkspaceComponent.vue";

const loading = ref(false);
const workspacesRows = ref([]);
const tableColumns = ref([
  {
    name: "title",
    required: true,
    label: "Título",
    align: "center",
    field: "title",
    headerStyle: "font-weight: 700 !important; font-size: 0.9rem;",
  },
  {
    name: "description",
    align: "center",
    label: "Descrição",
    field: "description",
    headerStyle: "font-weight: 700 !important; font-size: 0.9rem;",
  },
  {
    name: "options",
    align: "center",
    label: "Opções",
    headerStyle: "font-weight: 700 !important; font-size: 0.9rem;",
  },
]);
const paginationParams = ref({
  page: 1,
  per_page: 5,
  offset: 1,
});
const newWorkspaceDialog = ref({
  open: false
});

const getWorkspaces = async () => {
  setLoading(true);

  try {
    const { workspaces, pagination } = await getAllWorkspace(
      paginationParams.value
    );

    if (workspaces) workspacesRows.value = workspaces;
    if (pagination) {
      const { page, per_page, total } = pagination;

      paginationParams.value = {
        page: Number(page) || 1,
        per_page: Number(per_page) || 5,
        offset: Number(Math.ceil(total / per_page)) || 1,
      };
    }
  } catch (error) {
    console.error(error);
  }

  setLoading(false);
};

const openNewWorkspaceDialog = () => {
  newWorkspaceDialog.value.open = true;
}

const setLoading = (v) => (loading.value = v);

onBeforeMount(() => {
  getWorkspaces();
});
</script>

<style scoped>
.card {
  width: calc(75vw, 800px) !important;
}
</style>
