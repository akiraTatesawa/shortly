import chalk from "chalk";
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
  const { url: selectedUrl } = res.locals;

  try {
    const { url, shortened_url: shortUrl } = selectedUrl;

    return res.send({ id, url, shortUrl });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { user, url } = res.locals;

  try {
    const { user_id: urlUserId } = url;

    if (urlUserId !== user.id) {
      return res.sendStatus(401);
    }

    await UrlRepository.deleteUrlById(id);

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function redirectToUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const { rows: url } = await UrlRepository.getUrlByShortLink(shortUrl);

    if (!url[0]) {
      console.log(chalk.bold.red("Short Url not found"));
      return res.sendStatus(404);
    }

    const { url: originalURL, id, views_count: currentViewsCount } = url[0];
    await UrlRepository.addViewsCountToUrl(id, currentViewsCount);

    return res.redirect(200, originalURL);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
