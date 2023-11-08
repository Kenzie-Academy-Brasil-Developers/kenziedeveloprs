import "express-async-errors"
import express, { Application, json } from "express";
import "dotenv/config";
import { routes } from "./routes/index.routes";
import { handleError } from "./middleware";

const app: Application = express();
app.use(json())
app.use("/", routes)
app.use(handleError)

export default app;
