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
        :field-classes="`q-ml-xs q-mr-xs q-mt-xs ${
          success && 'success-totp-input'
        } ${error && 'error-totp-input'}`"
        input-classes=""
        input-styles="opacity: 1 !important;"
        @change="debouncedSendVerifyToken"
        outlined
        :num="6"
        :disable="disableInput"
        :color="error ? 'red' : 'primary'"
      />
    </q-card-section>
    <q-card-section>
      <q-separator></q-separator>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat @click="$authentication.signOut()">Voltar</q-btn>
      <q-btn
        color="primary"
        :disabled="loadingResendToken"
        :loading="success"
        @click="resendToken"
      >
        {{
          loadingResendToken
            ? `Tente novamente em ${secondsLeft}`
            : "Reenviar token"
        }}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import QOtp from "quasar-app-extension-q-otp";
import ConfirmationEmail from "../../assets/confirmation-email.jpeg";
import { authentication } from "../../store/modules/authentication.js";

const disableInput = ref(false);
const useAuthentication = authentication();
const loadingResendToken = ref(false);
const secondsLeft = ref(30);
const error = ref(false);
const success = ref(false);

const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const debounceDelay = 250;

const debouncedSendVerifyToken = debounce(async (code) => {
  setError(false);
  setSuccess(false);

  if (code?.length === 6) {
    setDisableInput(true);

    const response = await useAuthentication.verifyAccount(code);

    if (response?.status === 200) {
      handleSuccess()
    }

    if (
      response?.status === 401 &&
      response?.data?.message == "Token inválido"
    ) {
      setError(true);
    }

    setDisableInput(false);
  }
}, debounceDelay);

const setDisableInput = (v) => (disableInput.value = v);

const setError = (v) => (error.value = v);

const setSuccess = (v) => (success.value = v);

const countdownTimer = (callback) => {
  const timerId = setInterval(() => {
    secondsLeft.value = secondsLeft.value - 1;

    if (secondsLeft.value === 0) {
      clearInterval(timerId);
      callback();
    }
  }, 1000);

  return timerId; // Retorna o ID do temporizador para que você possa pará-lo se necessário
};

const clearSecondsLeft = () => {
  loadingResendToken.value = false;
  secondsLeft.value = 30;
};

const resendToken = async () => {
  try {
    setError(false);
    startCounterTime();
    await useAuthentication.resendVerifyToken();
  } catch (error) {
    console.log(error);
  }
};

const startCounterTime = () => {
  loadingResendToken.value = true;
  countdownTimer(() => {
    clearSecondsLeft();
  });
};

const handleSuccess = async () => {
  setSuccess(true);
}
</script>

<style scoped>
.card {
  width: min(85vw, 600px);
}
</style>
