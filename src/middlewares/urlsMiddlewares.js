import chalk from "chalk";

// Schemas
import { urlSchema } from "../schemas/urlsSchemas.js";

// Repositories
import { UrlRepository } from "../repositories/urlsRepository.js";

export function validateUrlBody(req, res, next) {
  const { error } = urlSchema.validate(req.body);

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  return next();
}

export async function checkIfUrlExists(req, res, next) {
  const { id } = req.params;

  try {
    const { rows: urlArray } = await UrlRepository.getUrlById(id);

    if (!urlArray[0]) {
      console.log(chalk.red.bold("URL not found"));
      return res.sendStatus(404);
    }

    const [url] = urlArray;
    res.locals.url = url;

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
