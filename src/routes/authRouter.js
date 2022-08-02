import { Router } from "express";

// Middlewares
import {
  checkIfEmailIsAlreadyRegistered,
  checkIfUserExists,
  validateSignInBody,
  validateSignUpBody,
  validateUserPassword,
} from "../middlewares/authMiddlewares.js";

// Controllers
import { postUser, signIn } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post(
  "/signup",
  validateSignUpBody,
  checkIfEmailIsAlreadyRegistered,
  postUser
);

authRouter.post(
  "/signin",
  validateSignInBody,
  checkIfUserExists,
  validateUserPassword,
  signIn
);
