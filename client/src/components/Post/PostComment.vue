<template>
  <div class="comment">
    <span class="font-weight-bold mr-1">{{ commenter }}</span>
    <span v-if="commentTooLong && folded">{{ foldedComment }}</span>
    <span v-else>{{ comment }}</span>
    <button
      @click="folded = false"
      class="ml-1 text--disabled"
      v-if="commentTooLong && folded"
    >
      more
    </button>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      folded: true,
    };
  },
  computed: {
    commentTooLong() {
      return this.comment.split("").length > 200;
    },
    foldedComment() {
      return (
        this.comment
          .split(" ")
          .slice(0, 20)
          .join(" ") + "..."
      );
    },
  },
  props: {
    commenter: String,
    comment: String,
  },
});
</script>

<style></style>
