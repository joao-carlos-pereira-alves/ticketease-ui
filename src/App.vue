<template>
  <q-layout view="lHh LpR lFf">
    <NavBar v-if="!hideMenu" />
    <Drawer v-if="!hideMenu" />
    <Footer v-if="$q.screen.xs || ($q.screen.sm && !hideMenu)" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import NavBar from "./components/navbar/Index.vue";
import Drawer from "./components/drawer/Index.vue";
import Footer from "./components/footer/Index.vue";

export default {
  components: {
    NavBar,
    Footer,
    Drawer
  },
  beforeMount() {
    this.$authentication.checkAndFetchUser
  },
  computed: {
    hideMenu() {
      return this.$route.meta.hideMenu || false;
    },
  },
};
</script>
