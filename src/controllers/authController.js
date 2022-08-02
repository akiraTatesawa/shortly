import bcrypt from "bcrypt";

// Repositories
import { UserRepository } from "../repositories/userRepository.js";

export async function postUser(req, res) {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    await UserRepository.createUser(name, email, hashPassword);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
