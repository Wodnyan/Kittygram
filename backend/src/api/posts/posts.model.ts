import { Model } from "objection";

export default class Post extends Model {
  id!: number;
  user_id!: number;
  image!: string;
  description?: string;
  created_at!: string;

  static get tableName() {
    return "posts";
  }

  static relationMappings() {
    const User = require("../auth/auth.model");

    return {
      poster: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.user_id",
          to: "users.id",
        },
      },
    };
  }
}
