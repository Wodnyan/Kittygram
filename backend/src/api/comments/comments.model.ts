import { Model } from "objection";
import path from "path";

export default class Comment extends Model {
  id!: number;
  user_id!: number;
  post_id!: number;
  comment!: string;
  created_at!: string;

  static get tableName() {
    return "comments";
  }

  static relationMappings = {
    post: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "../post/post.model"),
      join: {
        from: "comments.post_id",
        to: "posts.id",
      },
    },
    commenter: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "../auth/auth.model"),
      join: {
        from: "comments.user_id",
        to: "users.id",
      },
    },
  };
}
