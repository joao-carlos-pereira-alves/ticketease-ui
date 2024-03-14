<template>
  <q-dialog v-model="openDialog" persistent>
    <q-card
      style="width: 700px; max-width: 80vw"
      :class="{
        'low-priority': ticket.priority == 'low',
        'medium-priority': ticket.priority == 'medium',
        'high-priority': ticket.priority == 'high',
      }"
    >
      <q-card-section>
        <q-toolbar class="text-black">
          <div
            class="icon-card rounded-borders row items-center justify-center q-pa-sm primary"
          >
            <q-icon
              size="xl"
              :name="$getTagColor(ticket?.tags[0])?.iconName || 'bug_report'"
            />
          </div>
          <q-toolbar-title class="row items-center">
            <div class="col-12 text-weight-bold row" :class="{'text-h6': !$q.screen.xs, 'text-subtitle2': $q.screen.xs}">
              {{ $truncateString($capitalize(ticket.subject), 37) }}
              <q-tooltip v-if="ticket.subject.length >= 37">
                {{ ticket.subject }}
              </q-tooltip>
            </div>
            <div class="col-12 text-left row items-center text-subtitle2">
              <span v-if="!$q.screen.xs"
                >Prioridade: {{ $formatPriority(ticket.priority).label }}</span
              >
              <q-icon
                name="info"
                :style="`color: ${$formatPriority(ticket.priority).color}`"
                size="20px"
                class="q-pl-xs"
              ></q-icon>
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
            </div>
          </q-toolbar-title>
          <div class="row items-center">
            <q-icon
              name="access_time"
              color="grey"
              size="22px"
              class="q-mr-xs"
            ></q-icon>
            <span v-if="!$q.screen.xs">{{ $formatTimeAgo(ticket.created_at) }} atrás</span>
          </div>
        </q-toolbar>
      </q-card-section>
      <q-card-section class="q-py-none">
        <q-separator></q-separator>
      </q-card-section>
      <q-card-section class="text-h6 text-weight-medium">
        Descrição do Chamado
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-scroll-area style="height: 150px; max-width: 100%">
          <div class="description-card q-pa-sm rounded-borders">
            {{ ticket.description }}
          </div>
        </q-scroll-area>
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ticket } from "../../store/modules/tickets";

export default {
  props: {
    open: { required: true, default: false, type: Boolean },
    ticket: { required: true, type: Object },
  },
  computed: {
    openDialog: {
      get() {
        return this.open;
      },
      set(newValue) {
        this.$emit("update:open", newValue);
      },
    },
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

.description-card {
  background-color: rgba(0, 0, 0, 0.075);
}
</style>
