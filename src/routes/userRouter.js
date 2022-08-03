import { Router } from "express";

// Middlewares
import { validateToken } from "../middlewares/tokenMiddleware.js";

export const userRouter = Router();

userRouter.get("/users/me", validateToken);
