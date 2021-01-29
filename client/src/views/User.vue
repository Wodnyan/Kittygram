<template>
  <div>
    <Nav />
    <user-info :user="user" />
    <v-row no-gutters class="post-grid">
      <v-col v-for="post in posts" :key="post.id" cols="4">
        <v-img :src="post.image"></v-img>
      </v-col>
    </v-row>
    <!-- <v-img v-for="post in posts" :key="post.id" :src="post.image"></v-img> -->
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { fetchAllUsersPosts } from "@/lib/api/posts";
import { checkUserCredentials, getUserInfo } from "@/lib/api/users";
import Nav from "@/components/Nav/Nav.vue";
import { User } from "@/types/user";
import UserInfo from "@/components/UserInfo.vue";

export default Vue.extend({
  data() {
    return {
      posts: Array,
      user: {} as User,
    };
  },
  components: {
    Nav,
    UserInfo,
  },
  async mounted() {
    try {
      const { id } = this.$route.params;
      const creds = await checkUserCredentials();
      this.$store.commit("addUser", creds);
      const userInfo = await getUserInfo(Number(id));
      this.user = userInfo;
      const posts: any = await fetchAllUsersPosts(Number(id));
      this.posts = posts;
    } catch ({ response }) {
      if (response.status === 401) {
        this.$router.push("/sign-up");
      } else {
        console.log(response);
      }
    }
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/abstracts/screen-sizes";

.post-grid {
  margin: 1rem auto 0;
  max-width: $lg;
}
</style>
