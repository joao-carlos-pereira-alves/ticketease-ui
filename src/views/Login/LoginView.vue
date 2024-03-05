<template>
  <q-page padding class="row items-center justify-center">
    <div class="row login-card shadow-1">
      <q-card
        class="col-6 text-white no-border-radius shadow-0"
        style="background-color: rgba(255, 255, 255, 0.1)"
      >
        <q-card-section class="text-left">
          <small>TicketEase</small>
        </q-card-section>
        <q-card-section class="q-mt-xl">
          <div class="text-h5">Olá, bem vindo de volta.</div>
        </q-card-section>
        <q-card-section>
          <div class="text-center">Não tem uma conta?</div>
        </q-card-section>
        <q-card-section class="flex justify-center">
          <q-btn outline rounded color="white" label="Criar conta" />
        </q-card-section>
      </q-card>
      <q-card class="col-6 text-white no-border-radius shadow-0 q-pa-sm">
        <q-card-section>
          <div class="text-h6 text-left text-primary">Acessar sua conta</div>
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md">
            <div>
              <q-input outlined v-model="text" label="E-mail" />
            </div>
            <div>
              <q-input outlined v-model="text" label="Senha" class="" />
            </div>
            <div class="row items-center">
              <div class="col-6 text-left">
                <q-checkbox
                  v-model="keepLoggedUser"
                  label="Mantenha-me conectado"
                  class="text-primary"
                />
              </div>
              <div class="col-6 text-right">
                <a>Esqueceu a senha?</a>
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-section>
          <q-btn
            unelevated
            rounded
            color="primary"
            label="Entrar"
            class="full-width"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";

const keepLoggedUser = ref(false);
</script>

<style scoped>
.login-card {
  min-height: 400px;
  width: min(85vw, 50vw);
}
</style>
