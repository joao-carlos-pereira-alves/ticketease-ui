<template>
  <q-page padding class="row items-center justify-center">
    <div class="">
      <q-card class="success-card q-mb-sm" v-if="successSignUp">
        <q-card-section>
          Parabéns pelo seu cadastro! 🎉 Para ativar a sua conta e começar a
          aproveitar todos os benefícios da nossa plataforma, por favor,
          verifique o seu e-mail. Enviamos um link de verificação para o
          endereço de e-mail fornecido durante o cadastro.
        </q-card-section>
      </q-card>
      <div
        class="container q-mb-xl"
        id="container"
        :class="{ 'right-panel-active': step === 1 }"
      >
        <div class="form-container sign-up-container">
          <q-form
            ref="signUpFormComponent"
            @submit="onSubmitSignUp"
            @reset="onReset"
          >
            <div class="text-h4 text-center text-weight-bolder q-mt-xl q-mb-lg">
              Cadastre-se
            </div>
            <q-input
              outlined
              label="Nome"
              class="q-mb-sm full-width"
              :rules="[rules.required, rules.name]"
              v-model="signUpForm.name"
              :error-message="signUpErrors.name"
              :error="signUpErrors?.nameError"
              @update:model-value="clearErrorMessages"
              type="text"
              lazy-rules
            />
            <q-input
              outlined
              label="E-mail"
              class="q-mb-sm full-width"
              :rules="[rules.required, rules.email]"
              v-model="signUpForm.email"
              :error-message="signUpErrors.email"
              :error="signUpErrors?.emailError"
              @update:model-value="clearErrorMessages"
              type="email"
              lazy-rules
            />
            <q-input
              outlined
              label="Senha"
              class="full-width"
              :rules="[rules.required, rules.password]"
              v-model="signUpForm.password"
              :error-message="signUpErrors.password"
              :error="signUpErrors?.passwordError"
              @update:model-value="clearErrorMessages"
              type="password"
              lazy-rules
            />
            <q-btn
              unelevated
              rounded
              color="primary"
              label="Criar conta"
              type="submit"
              :loading="loadingSignUp"
              class="q-mt-sm"
            />
          </q-form>
        </div>
        <div class="form-container sign-in-container">
          <q-form
            ref="loginFormComponent"
            @submit="onSubmitSignIn"
            @reset="onReset"
          >
            <div class="text-h4 text-center text-weight-bolder q-mt-xl q-mb-lg">
              Entrar
            </div>
            <q-input
              outlined
              label="E-mail"
              class="q-mb-sm full-width"
              :rules="[rules.required, rules.email]"
              v-model="loginForm.email"
              :error-message="signInErrors.email"
              :error="signInErrors?.emailError"
              @update:model-value="clearErrorMessages"
              type="email"
              lazy-rules
            />
            <q-input
              outlined
              label="Senha"
              class="full-width q-pb-none"
              :rules="[rules.required]"
              v-model="loginForm.password"
              :error-message="signInErrors.password"
              :error="signInErrors?.passwordError"
              @update:model-value="clearErrorMessages"
              type="password"
              lazy-rules
            />
            <a class="pointer text-black q-py-xs">Esqueceu a senha?</a>
            <q-btn
              unelevated
              rounded
              color="primary"
              label="Entrar"
              type="submit"
              :loading="loadingSignIn"
            />
          </q-form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <div class="text-h3 text-center text-weight-bolder">
                Bem vindo de volta!
              </div>
              <p>
                Para se manter conectado conosco, faça login com seu e-mail e
                senha.
              </p>
              <button class="ghost" id="signIn" @click="updateStep(0)">
                Entrar
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <div class="text-h3 text-center text-weight-bolder">
                Olá, amigo!
              </div>
              <p>
                Digite suas informações, prepare seu espaço de trabalho e
                explore todas as funcionalidades do sistema!
              </p>
              <button class="ghost" id="signUp" @click="updateStep(1)">
                Criar conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { authentication } from "../../store/modules/authentication";

const successSignUp = ref(false);
const loadingSignIn = ref(false);
const loadingSignUp = ref(false);
const signInErrors = ref({
  email: null,
  password: null,
  passwordError: false,
  emailError: false,
});
const signUpErrors = ref({
  name: null,
  email: null,
  password: null,
  nameError: false,
  passwordError: false,
  emailError: false,
});
const useAuthentication = authentication();
const loginForm = ref({
  email: null,
  password: null,
  rememberMe: false,
});
const signUpForm = ref({
  name: null,
  email: null,
  password: null,
});
const rules = ref({
  required: (v) => !!v || "Campo obrigatório",
  email: (v) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(v) || "E-mail inválido";
  },
  password: (v) =>
    v?.length >= 6 || "Senha deve conter pelo menos 6 caracteres",
  name: (v) =>
    (v?.length >= 3 && v?.length <= 50) ||
    "Nome deve conter entre 3 e 50 caracteres",
});
const loginFormComponent = ref(null);
const signUpFormComponent = ref(null);
const step = ref(0);

const updateStep = (value) => {
  onReset();

  step.value = value;
};

const onReset = () => {
  clearErrorMessages();
  clearLoginForm();
  clearSignUpForm();

  if (loginFormComponent?.value) {
    loginFormComponent.value.resetValidation();
  }

  if (signUpFormComponent?.value) {
    signUpFormComponent.value.resetValidation();
  }

  successSignUp.value = false;
};

const clearLoginForm = () => {
  loginForm.value = {
    email: null,
    password: null,
  };
};

const clearSignUpForm = () => {
  signUpForm.value = {
    name: null,
    email: null,
    password: null,
  };
};

const setLoadingButton = (value, key) => {
  if (key === "SignIn") {
    loadingSignIn.value = value;
  } else {
    loadingSignUp.value = value;
  }
};

const onSubmitSignIn = async () => {
  setLoadingButton(true, "signIn");

  const signInRequest = await useAuthentication.signIn(loginForm.value);
  const errorStatuses = [404, 401, 422];

  if (errorStatuses.includes(signInRequest?.status)) {
    const data = signInRequest?.data || {};
    const status = data?.status || "not_found";
    const errorMessage = data?.message || "Email ou senha inválidos.";

    if (status == "not_found") {
      pushErrorMessage("email", errorMessage, "signIn");
    } else if (status == "unauthorized" && errorMessage == "Senha incorreta") {
      pushErrorMessage("password", errorMessage, "signIn");
    }
  }

  setLoadingButton(false, "signIn");
};

const onSubmitSignUp = async () => {
  setLoadingButton(true, "SignUp");

  const signUpRequest = await useAuthentication.signUp(signUpForm.value);
  const errorStatuses = [422];

  if (errorStatuses.includes(signUpRequest?.status)) {
    const data = signUpRequest?.data || {};
    const status = data?.status || "not_found";
    const errorMessage = data?.message || "Email ou senha inválidos.";

    if (
      status == "unprocessable_entity" &&
      errorMessage == "O e-mail já está em uso."
    ) {
      pushErrorMessage("email", errorMessage, "signUp");
    }
  }

  if (signUpRequest?.message == "Usuário criado com sucesso.") {
    handleSuccessSignUp();
  }

  setLoadingButton(false, "SignUp");
};

const handleSuccessSignUp = () => {
  updateStep(0);
  successSignUp.value = true;
}

const pushErrorMessage = (column, error_message, action = "signIn") => {
  if (action == "signIn") {
    signInErrors.value = {
      [column]: error_message,
      [`${column}Error`]: true,
    };
  } else {
    signUpErrors.value = {
      [column]: error_message,
      [`${column}Error`]: true,
    };
  }
};

const clearErrorMessages = () => {
  signInErrors.value = {
    email: null,
    password: null,
    passwordError: false,
    emailError: false,
  };

  signUpErrors.value = {
    name: null,
    email: null,
    password: null,
    nameError: false,
    passwordError: false,
    emailError: false,
  };
};
</script>

<style scoped>
.login-card {
  min-height: 400px;
  width: min(85vw, 50vw);
  border-radius: 10px;
}

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px !important;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: min(85vw, 768px);
  max-width: 100%;
  min-height: 480px;
}

.success-card {
  width: min(85vw, 768px);
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background: linear-gradient(to right, var(--secondary-bg), var(--primary));
  color: white;
  animation: slideInFromBottom 0.5s ease-out;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  background-color: red !important;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes slideInFromBottom {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: var(--secondary-bg);
  background: -webkit-linear-gradient(
    to right,
    var(--secondary-bg),
    var(--primary)
  );
  background: linear-gradient(to right, var(--secondary-bg), var(--primary));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>
