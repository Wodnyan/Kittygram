/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_ENDPOINT } from "@/constants";
import getCookieValue from "../get-cookie-value";
import { Post } from "@/types/post";

export const POSTS_ENDPOINT = `${API_ENDPOINT}/posts`;

export const fetchAllPosts = (userId?: number): Promise<Post> => {
  return axios
    .get(`${POSTS_ENDPOINT}?userId=${userId}&showComments=all`)
    .then(({ data }) => data.posts);
};

export const createPost = (file: any, description: string) => {
  const accessToken = getCookieValue("access_token");
  const formData = new FormData();
  formData.append("image", file);
  formData.append("description", description);
  return axios
    .post(POSTS_ENDPOINT, formData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(data => data);
};

export const fetchAllUsersPosts = (userId: number): Promise<Post> => {
  return axios
    .get(`${API_ENDPOINT}/users/${userId}/posts`, {
      withCredentials: true,
      params: {
        userId,
      },
    })
    .then(({ data }) => data.posts);
};
