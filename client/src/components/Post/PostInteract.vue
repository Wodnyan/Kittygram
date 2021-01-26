<template>
  <section>
    <v-btn @click="onClick" class="mx-2" fab dark small color="pink">
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
import { like, dislike } from "@/lib/api/likes";

export default Vue.extend({
  props: {
    isLiked: Boolean,
    postId: Number,
  },
  data() {
    return {
      liked: this.isLiked,
    };
  },
  methods: {
    like() {
      like(this.postId)
        .then(() => {
          this.liked = true;
        })
        .catch(error => console.log(error.response));
    },
    dislike() {
      console.log("what");
      dislike(this.postId)
        .then(() => {
          this.liked = false;
        })
        .catch(error => console.log(error));
    },
    onClick() {
      return this.liked ? this.dislike() : this.like();
    },
  },
});
</script>

<style></style>
