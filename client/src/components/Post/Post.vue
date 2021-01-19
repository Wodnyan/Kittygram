<template>
  <article>
    <v-card>
      <post-header :avatar="post.user.avatar" :username="post.user.username" />
      <post-image :image="post.image" />
      <post-interact :isLiked="post.isLiked" />
      <post-comments :user="post.user" :description="post.description" />
      <post-comment-form />
    </v-card>
  </article>
</template>

<script lang="ts">
import Vue from "vue";
import PostHeader from "./PostHeader.vue";
import PostComments from "./PostComments.vue";
import PostInteract from "./PostInteract.vue";
import PostImage from "./PostImage.vue";
import PostCommentForm from "./PostCommentForm.vue";

export default Vue.extend({
  components: {
    PostHeader,
    PostComments,
    PostInteract,
    PostImage,
    PostCommentForm,
  },
  props: {
    post: Object,
  },
});
</script>

<style lang="scss" scoped></style>
