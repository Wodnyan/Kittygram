import { Post } from "@/types/post";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    posts: [] as Post[] | [],
  },
  mutations: {
    addUser: (state, user) => {
      state.user = user;
    },
    addPost: (state, post) => {
      state.posts = [post, ...state.posts];
    },
    setPosts: (state, posts) => {
      state.posts = posts;
    },
    togglePostLike: (state, postId: number) => {
      return (state.posts = (state.posts as Post[]).map((post) => {
        if (postId === post.id) {
          post.liked = !post.liked;
        }
        return post;
      }));
    },
    addComment: (state, comment) => {
      state.posts = (state.posts as Post[]).map((post) => {
        if (comment.postId === post.id) {
          post.comments = [comment, ...post.comments];
        }
        return post;
      });
    },
  },
  actions: {},
  modules: {},
});
