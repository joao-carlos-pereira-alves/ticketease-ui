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
        <q-btn-dropdown
          class="q-ml-xs"
          dense
          flat
          color="primary"
          :label="orderBy.label"
        >
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
    <div class="col-12" v-if="$ticket?.tickets?.length">
      <q-card
        v-for="ticket in $ticket.tickets"
        style="border-radius: 15px"
        :class="{
          'low-priority': ticket.priority == 'low',
          'medium-priority': ticket.priority == 'medium',
          'high-priority': ticket.priority == 'high',
        }"
        class="pointer-card"
        @click="$emit('select-filter', ticket)"
      >
        <q-card-section class="row q-mb-md">
          <div
            class="col-2 col-sm-1 icon-card rounded-borders row items-center justify-center"
          >
            <q-icon
              size="lg"
              :name="$getTagColor(ticket?.tags[0])?.iconName || 'bug_report'"
            />
          </div>
          <div
            class="col-8 text-weight-bold text-left q-px-md row"
          >
            <div class="col-12">
              <span class="" v-if="!$q.screen.xs">{{ $truncateString($capitalize(ticket.subject), 50) }}</span>
              <span v-else>
                {{ $truncateString($capitalize(ticket.subject), 35) }}
              </span>
              <span v-if="!$q.screen.xs">
                <!-- Limita a exibição de tags a no máximo 2 -->
                <template v-for="(tag, index) in ticket.tags.slice(0, 2)">
                  <q-chip
                    :style="`background-color: ${
                      $getTagColor(tag).backgroundColor
                    };`"
                    size="sm"
                    class="rounded-borders q-mx-sm q-pa-md"
                  >
                    <div :style="`color: ${$getTagColor(tag).textColor}`">
                      {{ $capitalize($translateTag(tag).label) }}
                    </div>
                  </q-chip>
                </template>
                <span v-if="ticket.tags.length > 2">...</span>
              </span>
            </div>
            <div class="col-12 text-grey">
              <small>
                {{ $truncateString(ticket.description, 50) }}
              </small>
            </div>
          </div>
          <q-space></q-space>
          <div class="col text-right row justify-between items-center">
            <div class="col-12 text-right row items-center justify-end">
              <!-- Usando ícone do Quasar para representar a prioridade -->
              <span v-if="!$q.screen.xs">Prioridade: {{ $formatPriority(ticket.priority).label }}</span>
              <q-icon
                name="info"
                :style="`color: ${$formatPriority(ticket.priority).color}`"
                size="20px"
                class="q-pl-xs"
              ></q-icon>
            </div>
            <div class="col-12 text-caption row items-end justify-end">
              <div class="">
                <q-icon name="access_time" color="grey" size="18px" class="q-mr-xs"></q-icon>
                <span :class="{'text-caption': $q.screen.xs}" >{{ $formatTimeAgo(ticket.created_at) }} atrás</span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12" v-else>
      <q-card>
        <q-card-section>
          <!-- <q-card-section class="text-subtitle1 text-center text-weight-medium">
            Por enquanto está vazio, mas assim que um chamado for criado, vamos te notificar!
          </q-card-section> -->
          <q-img
            :src="noDataImage"
            fit="cover"
            spinner-color="primary"
            loading="lazy"
            style="max-width: 50%"
          />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 row justify-center q-mt-md" v-if="$ticket.offset">
      <q-pagination
        v-model="$ticket.pagination.page"
        :max="$ticket.offset"
        direction-links
        push
        color="second"
        active-design="push"
        active-color="primary"
        @update:model-value="$ticket.getTickets"
      />
    </div>
  </div>
</template>

<script>
import NoData from "../../assets/no-data.jpeg";

export default {
  emits: ["order", "select-filter"],
  data: () => ({
    orderBy: {
      key: "inserted_at_desc",
      label: "Data",
    },
    noDataImage: NoData,
  }),
  methods: {
    setOrderBy(order_by) {
      this.orderBy = this.orders.find((o) => o.key === order_by);
      this.$ticket.setOrder(order_by);
    },
  },
  setup() {
    const orders = [
      {
        key: "inserted_at_asc",
        label: "Data Crescente",
      },
      {
        key: "inserted_at_desc",
        label: "Data Crescente",
      },
    ];

    return {
      orders,
    };
  },
};
</script>

<style scoped>
.low-priority {
  border-left: 5px solid #5cb85c;
}

.medium-priority {
  border-left: 5px solid #f0ad4e;
}

.high-priority {
  border-left: 5px solid #d9534f;
}

.scroll-area {
  width: min(85vw, 42.5vw);
  height: 500px;
}

.pointer-card:hover {
  cursor: pointer;
  filter: brightness(90%);
}

.pointer-card:active {
  top: 1px;
}
</style>
