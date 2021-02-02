import { Model } from "objection";
import path from "path";

export default class Post extends Model {
  id!: number;
  user_id!: number;
  image!: string;
  description?: string;
  created_at!: string;

  static get tableName() {
    return "posts";
  }

  static relationMappings = {
    poster: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, "../auth/auth.model"),
      join: {
        from: "posts.user_id",
        to: "users.id",
      },
    },
    likes: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, "../likes/likes.model"),
      join: {
        from: "likes.post_id",
        to: "posts.id",
      },
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, "../comments/comments.model"),
      join: {
        from: "comments.post_id",
        to: "posts.id",
      },
    },
  };
}
