<template>
  <section>
    <v-btn @click="like" class="mx-2" fab dark small color="pink">
      <v-icon v-if="liked" dark>
        mdi-heart
      </v-icon>
      <v-icon v-else>
        mdi-heart-outline
      </v-icon>
    </v-btn>
    <v-btn fab dark small color="pink">
      <v-icon dark>
        mdi-chat
      </v-icon>
    </v-btn>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    isLiked: Boolean,
  },
  data() {
    return {
      liked: this.isLiked,
    };
  },
  methods: {
    like() {
      this.liked = !this.liked;
    },
  },
});
</script>

<style></style>
