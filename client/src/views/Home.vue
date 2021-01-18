<template>
  <div class="home">
    <post :post="post" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Post from "@/components/Post/Post.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Post,
  },
  data() {
    return {
      post: {
        image:
          "https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F026%2F489%2Fcrying.jpg",
        description: "Sadge cat",
        id: 1,
        user: {
          username: "foobar",
          avatar:
            "https://wompampsupport.azureedge.net/fetchimage?siteId=7576&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F026%2F489%2Fcrying.jpg",
        },
      },
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/abstracts/_screen-sizes.scss";
.home {
  max-width: $lg;
  margin: 0 auto;
}
</style>
