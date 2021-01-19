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

export default Vue.extend({
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
    onSubmit() {
      if (this.isInputEmpty) return;
      this.comment = "";
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
