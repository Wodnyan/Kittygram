import { Model } from "objection";

export default class User extends Model {
  id!: string;
  username!: string;
  email!: string;
  full_name!: string;
  created_at!: string;
  avatar?: string;
  description?: string;
  password?: string;

  static get tableName() {
    return "users";
  }

  static async isEmailAvailable(email: string) {
    const user = await this.query().findOne({
      email,
    });
    return user === undefined;
  }

  static async isUsernameAvailable(username: string) {
    const user = await this.query().findOne({
      username,
    });
    return user === undefined;
  }
}
