<template>
  <q-layout view="lHh LpR lFf" class="bg-white">
    <q-header v-if="!hideMenu" elevated>
      <NavBar v-if="!hideMenu" />
    </q-header>
    <!-- <Drawer
      v-if="($q.screen.md || $q.screen.lg || $q.screen.xl) && !hideMenu"
    /> -->
    <Footer v-if="$q.screen.xs || ($q.screen.sm && !hideMenu)" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import NavBar from "./components/navbar/Index.vue";
import Footer from "./components/footer/Index.vue";

export default {
  components: {
    NavBar,
    Footer,
  },
  beforeDestroy() {
    this.$authentication.logout()
  },
  computed: {
    hideMenu() {
      return this.$route.meta.hideMenu || false;
    },
  },
};
</script>
