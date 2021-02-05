import axios from "axios";
import { API_ENDPOINT } from "../../constants";
import getCookieValue from "../get-cookie-value";
import { POSTS_ENDPOINT } from "./posts";

const COMMENTS_ENDPOINT = `${API_ENDPOINT}/comments`;

export const postComment = async (comment: string, postId: number) => {
  const accessToken = getCookieValue("access_token");
  const {
    data: { post },
  } = await axios.post(
    `${POSTS_ENDPOINT}/${postId}/comments`,
    {
      comment,
    },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return post;
};
