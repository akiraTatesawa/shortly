import chalk from "chalk";

// Schemas
import { urlSchema as urls } from "../schemas/urlsSchemas.js";
import {
  userSignInSchema as signIn,
  userSignUpSchema as signUp,
} from "../schemas/authSchemas.js";

const Schemas = {
  signIn,
  signUp,
  urls,
};

export function validateBody(validator) {
  if (!Object.hasOwn(Schemas, validator)) {
    throw new Error("Invalid validator");
  }

  return (req, res, next) => {
    const { error } = Schemas[validator].validate(req.body);

    if (error) {
      console.log(chalk.red.bold(error.details[0].message));
      return res.sendStatus(422);
    }

    return next();
  };
}
