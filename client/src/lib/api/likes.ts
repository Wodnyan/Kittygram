import { API_ENDPOINT } from "@/constants";
import axios from "axios";
import getCookieValue from "../get-cookie-value";

export const dislike = (postId: number) => {
  const accessToken = getCookieValue("access_token");
  return axios.delete(`${API_ENDPOINT}/posts/${postId}/dislike`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const like = (postId: number) => {
  const accessToken = getCookieValue("access_token");
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
