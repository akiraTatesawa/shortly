import { nanoid } from "nanoid";

export async function createShortUrl(req, res) {
  const cleanedUrl = req.body.url.trim();
  const short = nanoid(7);

  return res.send({ cleanedUrl, short });
}
