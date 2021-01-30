<template>
  <div class="post">
    <v-icon class="foo" size="50px" @click="closeOverlay">mdi-close</v-icon>
    <div class="post__image">
      <post-image :image="post.image" />
    </div>
    <div class="temp">
      <post-header :avatar="post.user.avatar" :username="post.user.username" />
      <div class="comment-overflow">
        <post-comments :user="post.user" :description="post.description" />
      </div>
      <div class="bottom">
        <div class="interact">
          <post-interact :postId="post.id" :isLiked="post.liked" />
        </div>
        <post-comment-form />
      </div>
    </div>
  </div>
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
    closeOverlay: Function,
    post: Object,
  },
});
</script>

<style lang="scss" scoped>
.post {
  max-width: 900px;
  width: 100vw;
  display: flex;
  color: black;
  &__image {
    background: white;
    display: block;
    height: 100%;
    width: 100%;
  }
  .temp {
    background: white;
    width: 50%;
    display: flex;
    height: 550px;
    flex-direction: column;
    .comment-overflow {
      overflow: auto;
      max-height: 400px;
      padding: 1rem;
    }
    .bottom {
      .interact {
        $border: 1px solid black;
        border-top: $border;
        border-bottom: $border;
        padding: 8px 0px;
      }
      margin-top: auto;
    }
  }
  .foo {
    position: fixed;
    top: 0;
    right: 0;
  }
}
</style>
