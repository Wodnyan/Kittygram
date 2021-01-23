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
  const formData = new FormData();
  formData.append("image", file);
  formData.append("description", description);
  console.log("post");
  return new Promise((resolve, reject) => {
    axios
      .post(POSTS_ENDPOINT, formData, {
        withCredentials: true,
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total);
        },
      })
      .then(data => resolve(data))
      .catch(reject);
  });
};
