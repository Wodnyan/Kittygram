<template>
  <div>
    <Nav />
    <div class="home">
      <main class="posts">
        <post v-for="post in $store.state.posts" :key="post.id" :post="post" />
      </main>
      <div class="suggestions" ref="suggestions">
        <suggestions />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Post from "@/components/Post/Post.vue";
import Suggestions from "@/components/Suggestions/Suggestions.vue";
import Nav from "@/components/Nav/Nav.vue";
import { checkUserCredentials } from "@/lib/api/users";
import { fetchAllPosts } from "@/lib/api/posts";

export default Vue.extend({
  name: "Home",
  components: {
    Post,
    Suggestions,
    Nav,
  },
  methods: {
    setSuggestionsPlace(element: HTMLElement) {
      const viewportWidth = window.innerWidth;
      element.style.left = viewportWidth / 2 + 120 + "px";
    },
  },
  mounted() {
    const suggestions = this.$refs.suggestions as HTMLElement;
    this.setSuggestionsPlace(suggestions);
    window.addEventListener("resize", () =>
      this.setSuggestionsPlace(suggestions),
    );
  },
  async created() {
    try {
      const user = await checkUserCredentials();
      this.$store.commit("addUser", user);
      const posts = await fetchAllPosts(user.id);
      this.$store.commit("setPosts", posts);
    } catch (error) {
      if (error.response.status === 401) {
        this.$router.push("/sign-up");
      } else {
        console.log(error);
      }
    }
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
  margin: 70px auto 0;
  display: flex;
  .posts {
    flex-basis: $md;
  }
  .suggestions {
    background: red;
    position: fixed;
  }
}
@media (max-width: $lg) {
  .home {
    .posts {
      margin: 0 auto;
    }
    .suggestions {
      display: none;
    }
  }
}
</style>
