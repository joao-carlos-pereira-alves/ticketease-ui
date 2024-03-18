<template>
  <q-card class="shadow-0 row transparent">
    <q-card-section class="col-12 col-sm-12 col-md-6">
      <q-input
        outlined
        v-model="filter.search_term"
        label="Procure por chamados"
        class="bg-white rounded-borders"
        placeholder="Procure por nomes ou descrição"
        @update:model-value="fetchFilteredTickets"
      >
        <template #prepend>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section class="col-12 col-sm-6 col-md-3">
      <q-select
        icon="menu"
        outlined
        class="bg-white"
        option-value="key"
        option-label="label"
        v-model="filter.status"
        :options="statuses"
        label="Status"
        @update:model-value="fetchFilteredTickets"
      />
    </q-card-section>
    <q-card-section class="col-12 col-sm-6 col-md-3">
      <q-btn-dropdown
        class="full-width full-height filter-button"
        outline
        label="Filtros"
        icon="filter_list"
        align="center"
        :transition-show="true"
        :transtion-duration="800"
      >
        <q-list style="max-width: 100px">
          <q-item v-for="tag in tags">
            <q-item-section>
              <q-item-label>
                <q-checkbox
                  class="text-caption"
                  v-model="filter.tags[tag.key]"
                  @update:model-value="fetchFilteredTickets"
                  :label="tag && tag.label && tag.label.toUpperCase()"
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
      <span
        class="pointer"
        style="min-width: 300px"
        @click="clearTagFilter"
        v-if="Object.values(filter.tags)?.filter((e) => e === true)?.length > 1"
      >
        Remover todos
      </span>
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
      status: { key: "all", label: "Todos" },
      search_term: null
    },
  }),
  methods: {
    getSelectedTag(tag) {
      return this.tags.find((t) => t.key === tag);
    },
    unselectTag(tag) {
      this.filter.tags[tag] = false;
      this.fetchFilteredTickets();
    },
    clearTagFilter() {
      Object.keys(this.filter.tags).forEach((tag) => {
        this.filter.tags[tag] = false;
      });

      this.fetchFilteredTickets();
    },
    formatFilter() {
      const selectedTags = Object.keys(this.filter.tags).filter(
        (tag) => this.filter.tags[tag]
      );
      const statusKey = this.filter.status.key;
      const searchTerm = this.filter.search_term;
      const orderBy = this.$ticket.orderBy;
      const filterObject = {};

      if (selectedTags?.length > 0) {
        filterObject.tags = selectedTags;
      }

      if (statusKey && statusKey !== "all") {
        filterObject.status = statusKey;
      }

      if (
        searchTerm !== null &&
        searchTerm !== undefined &&
        searchTerm.length
      ) {
        filterObject.search_term = searchTerm;
      }

      if (orderBy) {
        filterObject.order_by = orderBy;
      }

      return filterObject;
    },
    fetchFilteredTickets() {
      if (this.debouncedFetchFilteredTickets) {
        clearTimeout(this.debouncedFetchFilteredTickets);
      }

      this.debouncedFetchFilteredTickets = setTimeout(() => {
        const filteredParams = this.formatFilter();
        this.$ticket.setFilterParams(filteredParams);
        this.$ticket.getTickets();
      }, 250);
    },
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

    const statuses = ref([
      { key: "all", label: "Todos" },
      { key: "open", label: "Aberto" },
      { key: "in_progress", label: "Em Progresso" },
      { key: "waiting_for_user", label: "Esperando por Usuário" },
      { key: "waiting_for_third_party", label: "Esperando por Terceiros" },
      { key: "resolved", label: "Concluído" },
      { key: "closed", label: "Fechado" },
      { key: "canceled", label: "Cancelado" },
    ]);

    return {
      tags,
      statuses,
    };
  },
  mounted() {
    this.$watch(
      () => this.$ticket.orderBy,
      () => {
        this.fetchFilteredTickets();
      }
    );
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
