import chalk from "chalk";

// Repositories
import { UrlRepository } from "../repositories/urlsRepository.js";

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
