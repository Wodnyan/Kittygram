import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { PassportStatic } from "passport";
import User from "./api/auth/auth.model";

dotenv.config();

export default function passportConfig(passport: PassportStatic) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "http://localhost:5050/api/v1/auth/oauth/google/callback",
      },
      async (_, _1, profile: any, done: any) => {
        try {
          const userExists = await User.query().findOne({
            email: profile.emails[0].value,
          });
          if (userExists) {
            return done(null, userExists);
          }
          const user = await User.query().insertAndFetch({
            avatar: profile._json.picture,
            username: profile._json.name,
            email: profile._json.email,
            full_name: `${profile._json.family_name || ""} ${
              profile._json.given_name || ""
            }`,
          });
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}
