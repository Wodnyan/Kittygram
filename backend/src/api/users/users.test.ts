import supertest from "supertest";
import app from "../../app";
import { connection } from "../../db";

beforeAll(async () => {
  await connection.migrate.latest();
});

afterAll(async () => {
  await connection.migrate.rollback();
  await connection.destroy();
});

const testSignUpUser = {
  username: "foo",
  password: "foobar12345",
  email: "foo@foo.com",
  fullName: "Test Test",
};

describe("GET /api/v1/users/", () => {
  it("should respond with the user", async () => {
    const user = await supertest(app)
      .post("/api/v1/auth/sign-up")
      .send(testSignUpUser);

    const response = await supertest(app)
      .get("/api/v1/users/user")
      .set("Accept", "application/json")
      .auth(user.body.accessToken, { type: "bearer" })
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.user.username).toBe(testSignUpUser.username);
  });
});
