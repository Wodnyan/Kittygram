import supertest from "supertest";
import app from "../../app";
import { connection } from "../../db";
import { respondMessages } from "./auth.controllers";

beforeAll(async () => {
  await connection.migrate.latest();
});

afterAll(async () => {
  await connection.migrate.rollback();
  await connection.destroy();
});

const testSignUpUser = {
  username: "test",
  password: "test123456",
  email: "test@test.com",
  fullName: "Test Test",
};

const testSignUpUserBadCredentials = {
  username: "",
  password: "",
  email: "",
  fullName: "",
};

describe("POST /api/v1/auth/sign-up", () => {
  it("should respond with a token", async () => {
    const response = await supertest(app)
      .post("/api/v1/auth/sign-up")
      .send(testSignUpUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
    expect(response.body.message).toBe(respondMessages.successfulSignUp);
  });

  it("should respond with 400 and a message", async () => {
    const response = await supertest(app)
      .post("/api/v1/auth/sign-up")
      .send(testSignUpUserBadCredentials)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body.message).toBe(respondMessages.validationError);
  });
});
