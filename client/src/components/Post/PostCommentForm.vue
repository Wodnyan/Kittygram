<template>
  <form class="comment-form" @submit.prevent="onSubmit">
    <input class="comment-form__input pl-4" v-model="comment" type="text" />
    <button
      v-bind:class="{ 'text--disabled': isInputEmpty }"
      class="pa-4 blue--text"
    >
      Post
    </button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { postComment } from "@/lib/api/comments";

export default Vue.extend({
  props: {
    postId: Number,
  },
  data() {
    return {
      comment: "",
    };
  },
  computed: {
    isInputEmpty(): boolean {
      return this.comment.length < 1;
    },
  },
  methods: {
    async onSubmit() {
      if (this.isInputEmpty) return;
      try {
        console.log(this.postId);
        const post = await postComment(this.comment, Number(this.postId));
        console.log(post);
        this.comment = "";
      } catch (error) {
        console.log(error.response);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.comment-form {
  display: flex;
  flex-direction: row;
  &__input {
    width: 100%;
  }
}
</style>
