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
      <q-btn-dropdown
        class="full-width full-height filter-button"
        outline
        label="Filtros"
        icon="filter_list"
      >
        <q-list>
          <q-item v-for="tag in tags">
            <q-item-section>
              <q-item-label>
                <q-checkbox
                  v-model="filter.tags[tag.key]"
                  :label="tag.label.toUpperCase()"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-card-section>
    <q-card-section class="col-12 text-left q-pt-none">
      <q-chip
        v-for="tag in Object.keys(filter.tags).filter(
          (key) => this.filter.tags[key] === true
        )"
        color="white"
        text-color="black"
        size="lg"
        class="q-pa-md text-left q-mr-lg chip-item"
      >
        <q-icon
          name="close"
          color="primary"
          size="20px"
          class="chip-item-icon q-mr-sm pointer"
          @click="unselectTag(tag)"
        />
        <div class="text-body1">
          {{ getSelectedTag(tag).label }}
        </div>
      </q-chip>
      <span class="pointer" style="min-width: 300px;" @click="clearTagFilter" v-if="Object.values(filter.tags)?.filter(e => e === true)?.length > 1"> Remover todos </span>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";

export default {
  data: () => ({
    filter: {
      tags: {
        urgent: false,
        critical: false,
        deadline: false,
        new_feature: false,
        bug: false,
        security: false,
        documentation: false,
        user_feedback: false,
        performance_improvement: false,
        integration: false,
      },
    },
  }),
  methods: {
    getSelectedTag(tag) {
      return this.tags.find((t) => t.key === tag);
    },
    unselectTag(tag) {
      this.filter.tags[tag] = false;
    },
    clearTagFilter() {
      Object.keys(this.filter.tags).forEach((tag) => {
        this.filter.tags[tag] = false;
      })
    }
  },
  setup() {
    const tags = ref([
      { key: "urgent", label: "Urgente", color: "#FF5733" },
      { key: "critical", label: "Crítico", color: "#FF3333" },
      { key: "deadline", label: "Prazo Limite", color: "#FF9933" },
      {
        key: "new_feature",
        label: "Nova Funcionalidade",
        color: "#33FFA8",
      },
      { key: "bug", label: "Bug", color: "#FF3366" },
      { key: "security", label: "Segurança", color: "#33FFD1" },
      {
        key: "documentation",
        label: "Documentação",
        color: "#338CFF",
      },
      {
        key: "user_feedback",
        label: "Feedback do Usuário",
        color: "#33FFEB",
      },
      {
        key: "performance_improvement",
        label: "Melhoria de Performance",
        color: "#33FF57",
      },
      { key: "integration", label: "Integração", color: "#F933FF" },
    ]);

    return {
      tags,
    };
  },
};
</script>

<style scoped>
.chip-item-icon {
  border-radius: 50%;
  background-color: var(--primary-blur);
}

.chip-item {
  border: 1px solid rgb(207, 207, 207);
}

.filter-button {
  background-color: white !important;
  /* color: rgba(0, 0, 0, 0.3); */
  /* border: 1px solid rgba(0, 0, 0, 0.24); */
}

.filter-button:hover {
  color: black;
}
</style>
