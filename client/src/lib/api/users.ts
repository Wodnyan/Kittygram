import { API_ENDPOINT } from "@/constants";
import { User } from "@/types/user";
import axios from "axios";
import getCookieValue from "../get-cookie-value";

const ENDPOINT = `${API_ENDPOINT}/users`;

export const checkUserCredentials = async (): Promise<User> => {
  const accessToken = getCookieValue("access_token");
  return axios
    .get(`${ENDPOINT}/check`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(({ data }) => data.user);
};

export const getUserInfo = (userId: number): Promise<User> => {
  return axios
    .get(`${ENDPOINT}/${userId}`, {
      withCredentials: true,
    })
    .then(({ data }) => data.user);
};
