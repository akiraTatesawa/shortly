// Schemas
import { userSignUpSchema } from "../schemas/authSchemas.js";

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

export async function checkIfEmailIsRegistered(req, res, next) {
  const { email } = req.body;

  try {
    const { rows: user } = await UserRepository.getUserByEmail(email);

    if (user[0]) {
      return res.sendStatus(409);
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
