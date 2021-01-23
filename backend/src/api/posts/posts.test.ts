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


