<template>
  <div class="home">
    <main class="posts">
      <post :post="post" />
      <post :post="post" />
      <post :post="post" />
    </main>
    <div class="suggestions" ref="suggestions">
      <suggestions />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Post from "@/components/Post/Post.vue";
import Suggestions from "@/components/Suggestions/Suggestions.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Post,
    Suggestions,
  },
  methods: {
    setSuggestionsPlace(element: HTMLElement) {
      const viewportWidth = window.innerWidth;
      element.style.left = viewportWidth / 2 + 250 + "px";
    },
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
  mounted() {
    const suggestions = this.$refs.suggestions as HTMLElement;
    this.setSuggestionsPlace(suggestions);
    window.addEventListener("resize", () =>
      this.setSuggestionsPlace(suggestions),
    );
  },
  destroyed() {
    window.removeEventListener("resize", () =>
      this.setSuggestionsPlace(this.$refs.suggestions as HTMLElement),
    );
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/abstracts/_screen-sizes.scss";
.home {
  max-width: $lg;
  margin: 0 auto;
  display: flex;
  .posts {
    flex-basis: $md;
  }
  .suggestions {
    position: fixed;
  }
}
</style>
