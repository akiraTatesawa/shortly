import { Router } from "express";

// Middlewares
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validateUrlBody } from "../middlewares/urlsMiddlewares.js";

// Controllers
import {
  createShortUrl,
  selectUrlById,
} from "../controllers/urlsControllers.js";

export const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateUrlBody,
  createShortUrl
);

urlsRouter.get("/urls/:id", selectUrlById);

urlsRouter.get("/urls/open/:shortUrl");

urlsRouter.delete("/urls/:id", validateToken);
