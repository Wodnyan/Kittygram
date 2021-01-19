<template>
  <div>
    <v-app-bar fixed color="deep-purple accent-4" dense dark>
      <v-toolbar-title>Kittygram</v-toolbar-title>
      <v-icon>mdi-cat</v-icon>

      <v-spacer></v-spacer>

      <router-link to="/">
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/explore">
        <v-btn icon>
          <v-icon>mdi-compass</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/liked">
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/user">
        <v-btn icon>
          <v-avatar color="secondary" size="25"></v-avatar>
        </v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped></style>
