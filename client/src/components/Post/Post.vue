<template>
  <article>
    <v-card>
      <post-header :avatar="post.user.avatar" :username="post.user.username" />
      <post-image @click.native="toggleOverlay" :image="post.image" />
      <post-interact :postId="post.id" :isLiked="post.liked" />
      <post-comments :user="post.user" :description="post.description" />
      <post-comment-form />
      <v-overlay v-if="showPostOverlay">
        <post-overlay :post="post" :closeOverlay="toggleOverlay" />
      </v-overlay>
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
import PostOverlay from "./PostOverlay.vue";

export default Vue.extend({
  components: {
    PostHeader,
    PostComments,
    PostInteract,
    PostImage,
    PostCommentForm,
    PostOverlay,
  },
  props: {
    post: Object,
  },
  data() {
    return {
      showPostOverlay: false,
    };
  },
  methods: {
    toggleOverlay() {
      this.showPostOverlay = !this.showPostOverlay;
    },
  },
});
</script>

<style lang="scss" scoped></style>
