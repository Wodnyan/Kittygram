<template>
  <div class="container">
    <v-avatar size="150px" color="blue">
      <v-img alt="Avatar" :src="user.avatar" />
    </v-avatar>
    <div class="user-info">
      <div class="top">
        <h1 class="text-h4 font-weight-bold">
          {{ user.username }}
        </h1>
      </div>
      <div class="mid text-body-1">
        0 posts
      </div>
      <div class="bottom">
        <h1 class="text-h6 font-weight-bold">
          {{ user.fullName }}
        </h1>
        <p class="text-body-1">
          {{ user.description || "No description" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    user: Object,
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/abstracts/screen-sizes";

.container {
  display: flex;
  align-items: center;
  margin-top: 70px;
  padding: 2rem;
  max-width: $lg;
  border-bottom: 1px solid black;
  .user-info {
    margin-left: 2rem;
  }
}

@media (max-width: $md) {
  .container {
    flex-direction: column;
  }
}
</style>
