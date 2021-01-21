import bcrypt from "bcrypt";

export async function encryptPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function decryptPassword(hashed: string, plainText: string) {
  return await bcrypt.compare(plainText, hashed);
}
