import { Model } from "objection";
import path from "path";

export default class Like extends Model {
  id!: number;
  user_id!: number;
  post_id!: number;
  created_at!: string;

  static get tableName() {
    return "likes";
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "../auth/auth.model"),
      join: {
        from: "likes.user_id",
        to: "users.id",
      },
    },
    post: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "../posts/posts.model"),
      join: {
        from: "likes.post_id",
        to: "posts.id",
      },
    },
  };
}
