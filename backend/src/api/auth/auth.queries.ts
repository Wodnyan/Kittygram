import User from "./auth.model";

export async function isEmailUnique(email: string) {
  const findEmail = await User.query().findOne({
    email,
  });
  return !Boolean(findEmail);
}
