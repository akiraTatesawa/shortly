import { Router } from "express";

// Middlewares
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validateUrlBody } from "../middlewares/urlsMiddlewares.js";

// Controllers
import { createShortUrl } from "../controllers/urlsControllers.js";

export const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateUrlBody,
  createShortUrl
);

urlsRouter.get("/urls/:id");

urlsRouter.get("/urls/open/:shortUrl");

urlsRouter.delete("/urls/:id", validateToken);
