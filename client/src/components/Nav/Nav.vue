<template>
  <v-app-bar class="nav" fixed color="deep-purple accent-4" dense dark>
    <v-toolbar-title>Kittygram</v-toolbar-title>
    <v-icon>mdi-cat</v-icon>

    <v-spacer></v-spacer>

    <v-btn to="/" icon>
      <v-icon>{{ setIcon("/", "mdi-home", "mdi-home-outline") }}</v-icon>
    </v-btn>

    <v-btn to="/explore" icon>
      <v-icon>{{
        setIcon("/explore", "mdi-compass", "mdi-compass-outline")
      }}</v-icon>
    </v-btn>

    <v-btn to="/liked" icon>
      <v-icon>{{ setIcon("/liked", "mdi-heart", "mdi-heart-outline") }}</v-icon>
    </v-btn>

    <v-btn to="/new-post" icon>
      <v-icon size="25">{{
        setIcon("/new-post", "mdi-pencil-circle", "mdi-pencil-circle-outline")
      }}</v-icon>
    </v-btn>

    <v-btn :to="userRoute()" icon>
      <v-avatar color="secondary" size="25">
      <v-img alt="Avatar" :src="$store.state.user.avatar" />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default Vue.extend({
  methods: {
    setIcon(path: string, active: string, inActive: string) {
      return this.$router.currentRoute.path === path ? active : inActive;
    },
    userRoute() {
      return `/user/${this.$store.state.user?.id}`;
    },
  },
});
</script>

<style lang="scss" scoped></style>
