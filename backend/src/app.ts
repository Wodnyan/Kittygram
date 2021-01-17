import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { notFoundHandler, errorHandler } from "./middlewares/middlewares";
import api from "./api/api";
import db from "./db";

const app = express();

db();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/v1", api);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
