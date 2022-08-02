import { Router } from "express";

// Middlewares
import {
  checkIfEmailIsRegistered,
  validateSignUpBody,
} from "../middlewares/authMiddlewares.js";

// Controllers
import { postUser } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post(
  "/signup",
  validateSignUpBody,
  checkIfEmailIsRegistered,
  postUser
);

authRouter.post("/signin");
