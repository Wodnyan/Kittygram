import { Poster } from "./post";

export interface Comment {
  id: number;
  comment: string;
  createdAt: string;
  commenter: Poster;
}
