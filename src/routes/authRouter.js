import { Router } from "express";

// Middlewares
import {
  checkIfEmailIsAlreadyRegistered,
  checkIfUserExists,
  validateUserPassword,
} from "../middlewares/authMiddlewares.js";
import { validateBody } from "../middlewares/joiValidationMiddleware.js";

// Controllers
import { postUser, signIn } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post(
  "/signup",
  validateBody("signUp"),
  checkIfEmailIsAlreadyRegistered,
  postUser
);

authRouter.post(
  "/signin",
  validateBody("signIn"),
  checkIfUserExists,
  validateUserPassword,
  signIn
);
