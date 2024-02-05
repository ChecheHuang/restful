import loadEnv from "./utils/env";
loadEnv();
import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import responseFormatter from "./middleware/responseFormatter";
import bodyParser from "body-parser";
import logMiddleware from "./middleware/logMiddleware";
import apiRouter from "./routes/api";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(responseFormatter);
app.use(logMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRouter);

app.use((req: Request, res: Response, next: NextFunction) =>
  next(createError(404, "Endpoint not found"))
);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  let errorMessage = "An unknown error occurred: ";
  let statusCode = 500;
  if (err instanceof createError.HttpError) {
    statusCode = err.status;
    errorMessage = err.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
