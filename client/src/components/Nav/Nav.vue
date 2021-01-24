<template>
  <v-app-bar class="nav" fixed color="deep-purple accent-4" dense dark>
    <v-toolbar-title>Kittygram</v-toolbar-title>
    <v-icon>mdi-cat</v-icon>

    <v-spacer></v-spacer>

    <router-link to="/">
      <v-btn icon>
        <v-icon>{{ setIcon("/", "mdi-home", "mdi-home-outline") }}</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/explore">
      <v-btn icon>
        <v-icon>{{
          setIcon("/explore", "mdi-compass", "mdi-compass-outline")
        }}</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/liked">
      <v-btn icon>
        <v-icon>{{
          setIcon("/liked", "mdi-heart", "mdi-heart-outline")
        }}</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/new-post">
      <v-btn icon>
        <v-icon size="25">{{
          setIcon("/new-post", "mdi-pencil-circle", "mdi-pencil-circle-outline")
        }}</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/user">
      <v-btn icon>
        <v-avatar color="secondary" size="25"></v-avatar>
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    setIcon(path: string, active: string, inActive: string) {
      return this.$router.currentRoute.path === path ? active : inActive;
    },
  },
});
</script>

<style lang="scss" scoped></style>
