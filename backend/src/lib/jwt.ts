import jwt from "jsonwebtoken";

export function createAccessToken(payload: object) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
}

export function createRefreshToken(payload: object) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
}

export function verifyAccessToken(token: string) {
  return new Promise((resolve, rejects) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, data) => {
      if (err) return rejects(err);
      resolve(data);
    });
  });
}
