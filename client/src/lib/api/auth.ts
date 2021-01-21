import { API_ENDPOINT } from "@/constants";
import { User } from "@/types/user";
import axios from "axios";

interface Temp {
  user: User;
  accessToken: string;
}

interface SignUpInfo {
  username: User["username"];
  password: string;
  email: User["email"];
  fullName: User["fullName"];
}

const AUTH_ROUTE = `${API_ENDPOINT}/auth`;

export const createUser = async (userInfo: SignUpInfo): Promise<Temp> => {
  const { data } = await axios.post(`${AUTH_ROUTE}/sign-up`, userInfo, {
    withCredentials: true,
  });
  return data;
};
