import { Post } from "@/types/post";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    posts: [] as Post[],
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
  },
  actions: {},
  modules: {},
});
