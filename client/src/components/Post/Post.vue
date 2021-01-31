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
        :comments="comments"
        :user="post.user"
        :description="post.description"
        :full="false"
      />
      <post-comment-form />
    </v-card>
    <v-overlay v-if="showPostOverlay">
      <post-full
        :comments="comments"
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
      comments: [
        {
          id: 120,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 11412,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 10,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 11,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 141241,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 14124,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 2,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 3,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 120,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 11412,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 10,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 11,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 141241,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 14124,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 2,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
        {
          id: 3,
          username: "foobar",
          comment:
            "This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.",
        },
      ],
    };
  },
  methods: {
    toggleOverlay() {
      this.showPostOverlay = !this.showPostOverlay;
    },
  },
  updated() {
    console.log(this.post.liked);
  },
});
</script>

<style lang="scss" scoped></style>
