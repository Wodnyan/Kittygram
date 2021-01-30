<template>
  <section>
    <v-btn @click="onClick" class="mx-2" fab dark small color="pink">
      <v-icon v-if="isLiked" dark>
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
import { like, dislike } from "@/lib/api/likes";

export default Vue.extend({
  props: {
    isLiked: Boolean,
    postId: Number,
  },
  methods: {
    like() {
      like(this.postId)
        .then(() => {
          this.$store.commit("togglePostLike", this.postId);
        })
        .catch(error => console.log(error.response));
    },
    dislike() {
      dislike(this.postId)
        .then(() => {
          this.$store.commit("togglePostLike", this.postId);
        })
        .catch(error => console.log(error));
    },
    onClick() {
      return this.isLiked ? this.dislike() : this.like();
    },
  },
});
</script>

<style></style>
