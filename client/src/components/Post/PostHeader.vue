<template>
  <header class="d-flex align-center pa-3">
    <v-avatar size="36px" class="mr-2">
      <v-img alt="Avatar" :src="avatar" />
    </v-avatar>
    <h1 class="text-h6 font-weight-bold">{{ username }}</h1>
    <v-btn fab x-small elevation="1" class="ml-auto transparent">
      <v-icon dark>mdi-dots-horizontal</v-icon>
    </v-btn>
  </header>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PostAvatar",
  props: {
    username: String,
    avatar: String,
  },
});
</script>

<style lang="scsss" scoped></style>
