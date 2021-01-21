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
