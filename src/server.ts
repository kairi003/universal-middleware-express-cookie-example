import type { Get, UniversalMiddleware } from "@universal-middleware/core";
import { createMiddleware } from "@universal-middleware/express";
import express, { type RequestHandler } from "express";

const setExpressCookie: RequestHandler = (_request, response, next) => {
  response.cookie("express-cookie-example", "res-cookie", {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    path: "/",
    sameSite: "lax",
  });

  next();
};

const transformResponse = (() => () => {
  return (response) => {
    response.headers.set("X-Universal-Transformer", "active");
    return response;
  };
}) satisfies Get<[], UniversalMiddleware>;

const app = express();
const port = Number.parseInt(process.env.PORT ?? "3000", 10);

app.use(setExpressCookie);
app.use(createMiddleware(transformResponse)());

app.get("/", (_request, response) => {
  response.json({
    message: "Hello from Express res.cookie() with a universal response transformer",
  });
});

app.listen(port, "localhost", () => {
  console.log(`Server listening on http://localhost:${port}`);
});
