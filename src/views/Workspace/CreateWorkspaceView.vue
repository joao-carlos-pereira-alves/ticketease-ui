<template>
  <q-page padding class="q-pa-sm">
    <div class="default-page row">
      <q-card class="card">
        <q-card-section class="text-h6 text-weight-bold text-left q-pl-md">
          Criar Área de Trabalho
        </q-card-section>
        <q-card-section>
          <q-form class="row" @submit="onSubmit">
            <div class="col-12 q-py-sm">
              <q-input
                v-model="workspaceForm.title"
                outlined
                label="Título"
              ></q-input>
            </div>
            <div class="col-12 q-py-sm">
              <q-input
                v-model="workspaceForm.responsible_email"
                outlined
                label="E-mail do Responsável"
                type="email"
              ></q-input>
            </div>
            <div class="col-12 q-py-sm">
              <q-input
                v-model="workspaceForm.description"
                outlined
                label="Descrição"
                type="textarea"
              ></q-input>
            </div>
            <div class="col-12 text-right q-py-sm">
              <q-btn
                flat
                type="reset"
                class="q-mr-sm"
                @click="$router.push({ name: 'Dashboard' })"
                >Cancelar</q-btn
              >
              <q-btn color="primary" type="submit" :loading="loading"
                >Criar</q-btn
              >
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    workspaceForm: {
      title: null,
      responsible_email: null,
      description: null,
    },
  }),
  methods: {
    setLoading(v) {
      this.loading = v;
    },
    async onSubmit() {
      this.setLoading(true);

      try {
        await this.$workspace.createWorkspace(this.workspaceForm);
      } catch (error) {
        console.log(error);
      }

      this.setLoading(false);
    },
  },
};
</script>

<style scoped>
.card {
  width: calc(75vw, 800px) !important;
}
</style>
