import { compareSync } from "bcrypt";

// Schemas
import { userSignInSchema, userSignUpSchema } from "../schemas/authSchemas.js";

// Repositories
import { UserRepository } from "../repositories/userRepository.js";

export function validateSignUpBody(req, res, next) {
  const { error } = userSignUpSchema.validate(req.body);

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  return next();
}

export function validateSignInBody(req, res, next) {
  const { error } = userSignInSchema.validate(req.body);

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  return next();
}

export async function checkIfUserExists(req, res, next) {
  const { email } = req.body;

  try {
    const { rows: userArray } = await UserRepository.getUserByEmail(
      email.trim()
    );

    const [user] = userArray;

    if (!user) {
      return res.sendStatus(401);
    }

    res.locals.registeredUser = user;

    return next();
  } catch (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }
}

export function validateUserPassword(req, res, next) {
  const { password } = req.body;
  const { registeredUser } = res.locals;

  if (!compareSync(password, registeredUser.password)) {
    return res.sendStatus(401);
  }

  return next();
}

export async function checkIfEmailIsAlreadyRegistered(req, res, next) {
  const { email } = req.body;

  try {
    const { rows: user } = await UserRepository.getUserByEmail(email.trim());

    if (user[0]) {
      return res.sendStatus(409);
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
