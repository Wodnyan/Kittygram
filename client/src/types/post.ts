import { User } from "./user";
import { Comment } from "./comment";

export interface Post {
  id: number;
  descripition: string;
  image: string;
  liked: boolean;
  numberOfLikes: number;
  user: Poster;
  comments: Comment[] | [];
  createdAt: string;
}

export interface Poster {
  id: User["id"];
  avatar: User["avatar"];
  username: User["username"];
  email: User["email"];
}
