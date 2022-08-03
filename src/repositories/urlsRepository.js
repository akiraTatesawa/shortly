// Postgres Connection
import { connection } from "../dbStrategy/postgres.js";

export class UrlRepository {
  static async createShortLink(originalURL, shortenedURL, userId) {
    const query = {
      text: "INSERT INTO urls (url, shortened_url, user_id) VALUES ($1, $2, $3)",
      values: [originalURL, shortenedURL, userId],
    };

    return connection.query(query);
  }

  static async getUrlById(id) {
    const query = {
      text: "SELECT * FROM urls WHERE id = $1",
      values: [id],
    };

    return connection.query(query);
  }

  static async getUrlByShortLink(shortLink) {
    const query = {
      text: "SELECT * FROM urls WHERE shortened_url = $1",
      values: [shortLink],
    };

    return connection.query(query);
  }

  static async deleteUrlById(id) {
    const query = {
      text: "DELETE FROM urls WHERE id = $1",
      values: [id],
    };

    return connection.query(query);
  }
}
