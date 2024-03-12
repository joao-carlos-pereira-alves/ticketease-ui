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
          >{{ $ticket?.pagination?.total || 0 }}</span
        >
        chamados
      </div>
      <div class="col text-right">
        Ordenar por:
        <q-btn-dropdown class="q-ml-xs" dense flat color="primary" :label="orderBy.label">
          <q-list>
            <q-item
              v-for="order in orders"
              clickable
              v-close-popup
              @click="setOrderBy(order.key)"
            >
              <q-item-section>
                <q-item-label>{{ order.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <div class="col-12">
      <q-card v-for="ticket in $ticket.tickets" style="border-radius: 15px">
        <q-card-section class="row q-mb-md">
          <div
            class="col-2 col-sm-1 icon-card rounded-borders row items-center justify-center"
          >
            <q-icon size="lg" name="bug_report" />
          </div>
          <div
            class="col text-subtitle2 text-weight-bold text-left q-px-md row"
          >
            <div class="col-12">
              <span class=""> {{ ticket.subject }} </span>
              <span v-if="!$q.screen.xs">
                <q-chip
                  v-for="tag in ticket.tags"
                  :style="`background-color: ${
                    $getTagColor(tag).backgroundColor
                  };`"
                  size="md"
                  class="rounded-borders q-mx-sm"
                >
                  <div :style="`color: ${$getTagColor(tag).textColor}`">
                    {{ $capitalize(translateTag(tag).label) }}
                  </div>
                </q-chip>
              </span>
            </div>
            <div class="col-12 text-grey">
              <small>
                {{ $truncateString(ticket.description, 50) }}
              </small>
            </div>
          </div>
          <q-space></q-space>
          <div class="col text-right">
            <small class="text-caption">
              {{ formatTimeAgo(ticket.created_at) }} atrás
            </small>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/dist/locale/pt-br";

moment.locale("pt-br");

export default {
  beforeCreate() {
    this.$ticket.getTickets();
  },
  emits: ["order"],
  data: () => ({
    orderBy: {
      key: "inserted_at_desc",
      label: "Data",
    },
  }),
  methods: {
    translateTag(tag) {
      const tags = [
        { key: "urgent", label: "urgente", color: "#FF5733" },
        { key: "critical", label: "crítico", color: "#FF3333" },
        { key: "deadline", label: "prazo", color: "#FF9933" },
        {
          key: "new_feature",
          label: "nova funcionalidade",
          color: "#33FFA8",
        },
        { key: "bug", label: "bug", color: "#FF3366" },
        { key: "security", label: "segurança", color: "#33FFD1" },
        {
          key: "documentation",
          label: "documentação",
          color: "#338CFF",
        },
        {
          key: "user_feedback",
          label: "feedback do usuário",
          color: "#33FFEB",
        },
        {
          key: "performance_improvement",
          label: "melhoria de performance",
          color: "#33FF57",
        },
        { key: "integration", label: "integração", color: "#F933FF" },
      ];

      return tags.find((t) => t.key === tag);
    },
    setOrderBy(order_by) {
      this.orderBy = this.orders.find((o) => o.key === order_by);
      this.$ticket.setOrder(order_by)
    },
  },
  setup() {
    const formatTimeAgo = (createdAt) => {
      const createdAtDate = new Date(createdAt);
      const currentDate = new Date();

      createdAtDate.setHours(createdAtDate.getHours() - 3);

      const diffInMilliseconds = currentDate - createdAtDate;

      return moment.duration(diffInMilliseconds).humanize(false);
    };

    const orders = [
      {
        key: "inserted_at_asc",
        label: "Data Crescente",
      },
      {
        key: "inserted_at_desc",
        label: "Data Crescente",
      }
    ];

    return {
      formatTimeAgo,
      orders,
    };
  },
};
</script>

<style scoped>
.icon-card {
  background-color: var(--primary-blur);
  color: var(--primary);
}
</style>
