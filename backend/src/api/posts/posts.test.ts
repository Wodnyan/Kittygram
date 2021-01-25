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

const testPost = {
  description: "This is a test post",
};

const ENDPOINT = "/api/v1/posts/";

describe(`POST ${ENDPOINT}`, () => {
  it("should respond with 201 and the created post", async () => {
    const response = await supertest(app).post(ENDPOINT);
    expect(response.body.post.description).toBe(testPost.description);
  });
});
