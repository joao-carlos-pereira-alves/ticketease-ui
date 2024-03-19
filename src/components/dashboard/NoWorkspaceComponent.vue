<template>
  <q-card style="width: min(70vw, 800px);">
    <q-card-section class="text-h4 text-weight-bold">
      Bem-vindo(a) à nossa plataforma!
    </q-card-section>
    <q-card-section>
      Ainda não detectamos nenhuma área de trabalho cadastrada em sua conta.
      Para aproveitar ao máximo nossos recursos, recomendamos que você configure
      sua primeira área de trabalho.
    </q-card-section>
    <q-card-section>
      <q-btn color="primary" @click="$router.push({ name: 'CreateWorkspace' })"> Criar Área de Trabalho </q-btn>
    </q-card-section>
    <q-card-section>
      <small>
        Se precisar de ajuda, por favor, consulte nossos tutoriais ou entre em
        contato com nosso suporte. Estamos aqui para ajudar!
      </small>
    </q-card-section>
  </q-card>
</template>

<script setup>
import NoWorkspaceImage from "../../assets/no-workspace.jpeg";
</script>
