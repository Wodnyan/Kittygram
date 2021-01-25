/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_ENDPOINT } from "@/constants";

const POSTS_ENDPOINT = `${API_ENDPOINT}/posts`;

export const fetchAllPosts = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(POSTS_ENDPOINT)
      .then(({ data }) => resolve(data.posts))
      .catch(reject);
  });
};

export const createPost = (file: any, description: string) => {
  const accessToken = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("image", file);
  formData.append("description", description);
  console.log("post");
  return axios
    .post(POSTS_ENDPOINT, formData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(data => data);
};
