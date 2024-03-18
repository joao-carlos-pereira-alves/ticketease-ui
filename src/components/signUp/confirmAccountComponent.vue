<template>
  <q-card class="card q-mb-xl">
    <q-card-section>
      <q-img
        :src="ConfirmationEmail"
        fit="cover"
        spinner-color="primary"
        loading="lazy"
        style="max-width: 300px"
      />
    </q-card-section>
    <q-card-section class="text-center">
      <div class="text-h4 text-primary text-weight-bolder">
        Código de Verificação
      </div>
      <small>
        Por favor, insira os 6 dígitos do código enviado para o seu e-mail para
        a verificação.
      </small>
    </q-card-section>
    <q-card-section class="row justify-center q-pt-none">
      <QOtp
        placeholder="-"
        field-classes="q-ml-xs q-mr-xs q-mt-xs"
        input-styles="opacity: 1 !important;"
        @change="sendVerifyToken"
        outlined
        :num="6"
        :disable="disableInput"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue"
import QOtp from "quasar-app-extension-q-otp";
import ConfirmationEmail from "../../assets/confirmation-email.jpeg";
import { authentication } from "../../store/modules/authentication.js"

const disableInput = ref(false);
const useAuthentication = authentication();

const sendVerifyToken = async (code) => {
  if (code?.length === 6) {
    setDisableInput(true);
    await useAuthentication.verifyAccount(code);
    setDisableInput(true);
  }
}

const setDisableInput = (v) => disableInput.value = v;
</script>

<style scoped>
.card {
  width: min(85vw, 600px);
}
</style>
