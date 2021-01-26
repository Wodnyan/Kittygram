import { API_ENDPOINT } from "@/constants";
import axios from "axios";

export const dislike = (postId: number) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.delete(`${API_ENDPOINT}/posts/${postId}/dislike`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const like = (postId: number) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.post(
    `${API_ENDPOINT}/posts/${postId}/like`,
    {},
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
