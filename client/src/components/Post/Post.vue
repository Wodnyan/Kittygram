<template>
  <article>
    <post-image
      v-if="onlyImage"
      @click.native="toggleOverlay"
      :image="post.image"
    />
    <v-card v-else>
      <post-header :avatar="post.user.avatar" :username="post.user.username" />
      <post-image @click.native="toggleOverlay" :image="post.image" />
      <post-interact :postId="post.id" :isLiked="post.liked" />
      <post-comments
        :comments="post.comments"
        :user="post.user"
        :description="post.description"
        :full="false"
      />
      <post-comment-form :postId="post.id" />
    </v-card>
    <v-overlay v-if="showPostOverlay">
      <post-full
        :comments="post.comments"
        :post="post"
        :closeOverlay="toggleOverlay"
      />
    </v-overlay>
  </article>
</template>

<script lang="ts">
import Vue from "vue";
import PostHeader from "./PostHeader.vue";
import PostComments from "./PostComments.vue";
import PostInteract from "./PostInteract.vue";
import PostImage from "./PostImage.vue";
import PostCommentForm from "./PostCommentForm.vue";
import PostFull from "./PostFull.vue";

export default Vue.extend({
  components: {
    PostHeader,
    PostComments,
    PostInteract,
    PostImage,
    PostCommentForm,
    PostFull,
  },
  props: {
    post: Object,
    onlyImage: Boolean,
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
