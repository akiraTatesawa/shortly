import { Router } from "express";

// Middlewares
import { validateToken } from "../middlewares/tokenMiddleware.js";

// Controllers
import { listUserInfo } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.get("/users/me", validateToken, listUserInfo);
