<template>
  <section>
    <img :src="image" width="100%" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PostImage",
  props: {
    image: String,
  },
});
</script>

<style></style>
