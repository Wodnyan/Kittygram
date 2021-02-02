interface Commenter {
  id: number;
  username: string;
  avatar?: string;
}

interface Constructor {
  id: number;
  comment: string;
  createdAt: string;
  commenterId: Commenter["id"];
  username: Commenter["username"];
  avatar?: Commenter["avatar"];
}

export default class FormatedComment {
  id!: number;
  comment!: string;
  createdAt!: string;
  commenter!: Commenter;

  constructor({
    username,
    id,
    commenterId,
    createdAt,
    comment,
    avatar,
  }: Constructor) {
    this.id = id;
    this.comment = comment;
    this.createdAt = createdAt;
    this.commenter = {
      id: commenterId,
      username,
      avatar,
    };
  }
}
