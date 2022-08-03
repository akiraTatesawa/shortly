import { nanoid } from "nanoid";

// Repositories
import { UrlRepository } from "../repositories/urlsRepository.js";

export async function createShortUrl(req, res) {
  const { user } = res.locals;

  const cleanedUrl = req.body.url.trim();
  const shortUrl = nanoid(7);

  try {
    await UrlRepository.createShortLink(cleanedUrl, shortUrl, user.id);

    return res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function selectUrlById(req, res) {
  const { id } = req.params;

  try {
    const { rows: urlArray } = await UrlRepository.getUrlById(id);

    if (!urlArray[0]) {
      return res.sendStatus(404);
    }

    const { url, shortened_url: shortUrl } = urlArray[0];

    return res.send({ id, url, shortUrl });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
