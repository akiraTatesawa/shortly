import { compareSync } from "bcrypt";

// Repositories
import { UserRepository } from "../repositories/userRepository.js";

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
    console.log(error);
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
