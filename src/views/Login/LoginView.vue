<template>
  <q-page padding class="row items-center justify-center">
    <div class="row login-card shadow-1 q-mb-lg">
      <q-card
        class="col-12 col-sm-12 col-md-6 text-white no-border-radius shadow-0"
        :style="{ 'background-color': 'var(--primary)' }"
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
      <q-card
        class="col-12 col-sm-12 col-md-6 text-white no-border-radius shadow-0 q-pa-sm text-black"
      >
        <q-card-section>
          <div class="text-h6 text-left">Acessar sua conta</div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset">
            <div>
              <q-input
                outlined
                label="E-mail"
                class="q-pb-md"
                :rules="[rules.required, rules.email]"
                v-model="loginForm.email"
                :error-message="errors.email"
                :error="errors?.emailError"
                @update:model-value="clearErrorMessages"
                type="email"
              />
            </div>
            <div>
              <q-input
                outlined
                label="Senha"
                class="q-pb-sm"
                :rules="[rules.required]"
                v-model="loginForm.password"
                :error-message="errors.password"
                :error="errors?.passwordError"
                @update:model-value="clearErrorMessages"
                type="password"
              />
            </div>
            <div class="text-left">
              <q-checkbox
                v-model="loginForm.rememberMe"
                label="Mantenha-me conectado"
              />
            </div>
            <div class="">
              <q-btn
                unelevated
                rounded
                color="primary"
                label="Entrar"
                class="full-width"
                type="submit"
                :loading="loading"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { authentication } from "../../store/modules/authentication";

const loading = ref(false);
const errors = ref({
  email: null,
  password: null,
  passwordError: false,
  emailError: false,
});
const useAuthentication = authentication();
const loginForm = ref({
  email: null,
  password: null,
  rememberMe: false,
});
const rules = ref({
  required: (v) => !!v || "Campo obrigatório",
  email: (v) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(v) || "E-mail inválido";
  },
});

const onReset = () => {
  clearErrorMessages();

  loginForm.value = {
    email: null,
    password: null,
  };
};

const setLoadingButton = (v) => loading.value = v

const onSubmit = async () => {
  setLoadingButton(true)

  const signInRequest = await useAuthentication.signIn(loginForm.value);
  const errorStatuses = [404, 401, 422];

  if (errorStatuses.includes(signInRequest?.status)) {
    const data = signInRequest?.data || {};
    const status = data?.status || "not_found";
    const errorMessage = data?.message || "Email ou senha inválidos.";


    if (status == "not_found") {
      pushErrorMessage("email", errorMessage);
    } else if (status == "unauthorized" && errorMessage == "Senha incorreta") {
      pushErrorMessage("password", errorMessage);
    }
  }

  setLoadingButton(false)
};

const pushErrorMessage = (column, error_message) => {
  errors.value = {
    [column]: error_message,
    [`${column}Error`]: true,
  };
};

const clearErrorMessages = () => {
  if (
    errors?.value?.passwordError == false ||
    errors?.value?.emailError == false
  )
    return;

  errors.value = {
    email: null,
    password: null,
    passwordError: false,
    emailError: false,
  };
};
</script>

<style scoped>
.login-card {
  min-height: 400px;
  width: min(85vw, 50vw);
}
</style>
