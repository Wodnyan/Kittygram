<template>
  <section>
    <div class="description">
      <span class="font-weight-bold mr-1">{{ user.username }}</span>
      <span>{{ description }}</span>
    </div>
    <div class="comments">
      <button class="text--disabled">View all 100 comments</button>
      <post-comment
        comment="This a very sadge cat"
        commenter="Commenter2"
      ></post-comment>
      <post-comment
        comment="This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install."
        commenter="Commenter2"
      ></post-comment>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import PostComment from "./PostComment.vue";

export default Vue.extend({
  props: {
    user: Object,
    description: String,
  },
  components: {
    PostComment,
  },
});
</script>

<style></style>
