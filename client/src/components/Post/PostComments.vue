<template>
  <section>
    <div class="description">
      <span class="font-weight-bold mr-1">{{ user.username }}</span>
      <span>{{ description }}</span>
    </div>
    <div class="comments">
      <button v-if="!full" class="text--disabled">
        {{ numberOfComments }}
      </button>
      <post-comment
        :comment="comment.comment"
        :commenter="comment.commenter"
        v-for="comment in temp"
        :key="comment.id"
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
    comments: Array,
    full: Boolean,
  },
  components: {
    PostComment,
  },
  computed: {
    temp() {
      return this.full ? this.comments : this.comments.slice(0, 3);
    },
    numberOfComments() {
      const length = this.comments.length;
      return this.comments.length === 1
        ? `View ${this.comments.length} comment`
        : `View all ${length} comments`;
    },
  },
});
</script>

<style></style>
