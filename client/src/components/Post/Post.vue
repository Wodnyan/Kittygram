<template>
  <article>
    <v-card>
      <post-header :avatar="post.user.avatar" :username="post.user.username" />
      <post-image :image="post.image" />
      <post-interact />
      <post-comments />
    </v-card>
  </article>
</template>

<script lang="ts">
import Vue from "vue";
import PostHeader from "./PostHeader.vue";
import PostComments from "./PostComments.vue";
import PostInteract from "./PostInteract.vue";
import PostImage from "./PostImage.vue";

export default Vue.extend({
  components: {
    PostHeader,
    PostComments,
    PostInteract,
    PostImage,
  },
  props: {
    post: Object,
  },
});
</script>

<style lang="scss" scoped></style>
