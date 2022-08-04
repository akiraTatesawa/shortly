import { Router } from "express";

// Middlewares
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { checkIfUrlExists } from "../middlewares/urlsMiddlewares.js";
import { validateBody } from "../middlewares/joiValidationMiddleware.js";

// Controllers
import {
  createShortUrl,
  deleteUrl,
  redirectToUrl,
  selectUrlById,
} from "../controllers/urlsControllers.js";

export const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateBody("urls"),
  createShortUrl
);

urlsRouter.get("/urls/:id", checkIfUrlExists, selectUrlById);

urlsRouter.get("/urls/open/:shortUrl", redirectToUrl);

urlsRouter.delete("/urls/:id", validateToken, checkIfUrlExists, deleteUrl);
