import { API_ENDPOINT } from "@/constants";
import { User } from "@/types/user";
import axios from "axios";

const ENDPOINT = `${API_ENDPOINT}/users`;

export const getUserInfo = (): Promise<User> => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .get(`${ENDPOINT}/user`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(({ data }) => data.user);
};
