import { User } from "./user";

export interface Post {
  id: number;
  descripition: string;
  image: string;
  liked: boolean;
  user: User;
}
