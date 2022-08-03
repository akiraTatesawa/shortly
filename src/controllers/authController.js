// eslint-disable-next-line import/no-unresolved
import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Repositories
import { UserRepository } from "../repositories/userRepository.js";

export async function postUser(req, res) {
  const { name, email, password } = req.body;

  const cleanedEmail = stripHtml(email).result.trim();
  const cleanedName = stripHtml(name).result.trim();
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    await UserRepository.createUser(cleanedName, cleanedEmail, hashPassword);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export function signIn(_req, res) {
  const { registeredUser } = res.locals;
  const { id, name } = registeredUser;

  const tokenData = { id };
  const KEY = process.env.JWT_SECRET;
  const config = { expiresIn: process.env.EXPIRES_IN };

  const token = jwt.sign(tokenData, KEY, config);

  return res.send({ token, name });
}
