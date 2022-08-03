import { Router } from "express";

// Middlewares
import { validateToken } from "../middlewares/tokenMiddleware.js";

export const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateToken);

urlsRouter.get("/urls/:id");

urlsRouter.get("/urls/open/:shortUrl");

urlsRouter.delete("/urls/:id");
