<template>
  <q-dialog v-model="openDialog" persistent backdrop-filter="invert(70%)">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="text-h6 text-weight-bold text-left q-pb-none">
        Nova Área de Trabalho
      </q-card-section>
      <q-card-section class="q-pb-none">
        <div class="col-12 alert-card text-body2">
          👋 Ao iniciar sua nova área de trabalho, você assume um papel
          fundamental como <strong>responsável</strong> principal! Fique tranquilo, pois
          manteremos você atualizado com todas as notificações essenciais
          diretamente no seu e-mail.
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="row" @submit="onSubmit">
          <div class="col-12 q-py-xs">
            <q-input
              v-model="workspaceForm.title"
              outlined
              label="Título"
              required
              :rules="[rules.required]"
            ></q-input>
          </div>
          <div class="col-12">
            <q-input
              v-model="workspaceForm.description"
              outlined
              label="Descrição"
              type="textarea"
              required
              :rules="[rules.required]"
            ></q-input>
          </div>
          <div class="col-12 text-right q-py-md">
            <q-btn
              flat
              type="reset"
              class="q-mr-sm"
              @click="closeDialog"
              >Cancelar</q-btn
            >
            <q-btn color="primary" type="submit" :loading="loading"
              >Criar</q-btn
            >
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    open: { required: true, default: false, type: Boolean },
  },
  emits: ["submit"],
  data: () => ({
    loading: false,
    workspaceForm: {
      title: null,
      responsible_email: null,
      description: null,
    },
    rules: {
      required: (v) => !!v || 'Campo obrigatório'
    }
  }),
  methods: {
    setLoading(v) {
      this.loading = v;
    },
    async onSubmit() {
      this.setLoading(true);

      try {
        await this.$workspace.createWorkspace(this.workspaceForm);

        this.emitSubmitEvent();
        this.closeDialog();
      } catch (error) {
        console.log(error);
      }

      this.setLoading(false);
    },
    emitSubmitEvent() {
      this.$emit("submit")
    },
    closeDialog() {
      this.openDialog = false;
    },
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

<style scoped></style>
