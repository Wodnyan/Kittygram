import supertest from "supertest";
import app from "../../app";
import { connection } from "../../db";

beforeEach(async () => {
  await connection.migrate.rollback();
  await connection.migrate.latest();
});

afterAll(async () => {
  await connection.destroy();
});

const testSignUpUser = {
  username: "test",
  password: "test123456",
  email: "test@test.com",
  fullName: "Test Test",
};

describe("GET /api/v1/users/", () => {
  it("should respond with the user", async () => {
    // Create User
    //const response = await supertest(app)
    //.get("/api/v1/users/")
    //.set("Accept", "application/json")
    //.expect("Content-Type", /json/)
    //.expect(200);
    //expect(response.body.user).toBe(.temp);
  });
});
