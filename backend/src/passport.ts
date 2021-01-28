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
            username: profile.displayName,
            email: profile.emails[0].value,
            full_name: `${profile.name.familyName} ${profile.name.givenName}`,
          });
          console.log(user);
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
}
