import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { notFoundHandler, errorHandler } from "./middlewares/middlewares";
import api from "./api/api";
import db from "./db";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportConfig from "./passport";

const app = express();

db();
passportConfig(passport);

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(passport.initialize());
app.use("/api/v1", api);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
