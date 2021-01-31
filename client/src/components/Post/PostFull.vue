<template>
  <v-container class="foo">
    <v-icon class="close" size="50px" @click="closeOverlay">mdi-close</v-icon>
    <v-row no-gutters>
      <v-col sm="12" lg="8">
        <post-image :image="post.image" />
      </v-col>
      <v-col class="post-info">
        <post-header
          :avatar="post.user.avatar"
          :username="post.user.username"
        />
        <div class="overflow">
          <post-comments
            :comments="comments"
            :full="true"
            :user="post.user"
            :description="post.description"
          />
        </div>
        <post-interact :postId="post.id" :isLiked="post.liked" />
        <post-comment-form />
      </v-col>
    </v-row>
  </v-container>
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
    comments: Array,
  },
});
</script>

<style lang="scss" scoped>
.foo {
  max-width: 900px;
}
.post-info {
  color: black;
  background: white;
  .overflow {
    height: 400px;
    overflow-y: auto;
  }
}
.close {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
