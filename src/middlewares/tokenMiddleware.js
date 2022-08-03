import chalk from "chalk";
import jwt from "jsonwebtoken";

// Repositories
import { UserRepository } from "../repositories/userRepository.js";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.includes("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const { rows: userArray } = await UserRepository.getUserById(id);
    const [user] = userArray;

    if (!user) {
      console.log(chalk.bold.red("User not found"));
      return res.sendStatus(404);
    }

    res.locals.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}
