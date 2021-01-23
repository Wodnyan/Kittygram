<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field label="Description" v-model="description"></v-text-field>
    <v-file-input v-model="file" chips truncate-length="15"></v-file-input>
    <v-btn type="submit">Create new post</v-btn>
  </v-form>
</template>

<script lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { createPost } from "@/lib/api/posts";

export default Vue.extend({
  data() {
    return {
      description: "",
      file: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        const data = await createPost(this.file, this.description);
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
});
</script>

<style></style>
