<template>
  <header ref="header" class="d-flex align-center pa-3">
    <v-avatar size="36px" class="mr-2">
      <v-img alt="Avatar" :src="avatar" />
    </v-avatar>
    <h1 class="text-h6 font-weight-bold">{{ username }}</h1>
    <v-btn
      @click="overlay = !overlay"
      fab
      x-small
      elevation="1"
      class="ml-auto transparent"
    >
      <v-icon dark>mdi-dots-horizontal</v-icon>
    </v-btn>
    <v-overlay :value="overlay">
      <v-card class="mx-auto">
        <v-list class="list">
          <v-list-item @click="report">
            <v-list-item-content>
              <v-list-item-title class="text-center">Report</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="unfollow">
            <v-list-item-content>
              <v-list-item-title class="text-center"
                >Unfollow</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="copyLink">
            <v-list-item-content>
              <v-list-item-title class="text-center"
                >Copy Link</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="closeOverlay">
            <v-list-item-content>
              <v-list-item-title class="text-center">Close</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-overlay>
  </header>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PostAvatar",
  data() {
    return {
      overlay: false,
    };
  },
  methods: {
    closeOverlay() {
      this.overlay = false;
    },
    copyLink() {
      console.log("copied link");
    },
    report() {
      console.log("reported");
    },
    follow() {
      console.log("followed");
    },
    unfollow() {
      console.log("unfollowed");
    },
  },
  props: {
    username: String,
    avatar: String,
  },
});
</script>

<style lang="scss" scoped>
.list {
  max-width: 500px;
  width: 100vw;
}
</style>
