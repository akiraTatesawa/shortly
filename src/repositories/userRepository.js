import SqlString from "sqlstring";

// Postgres Connection
import { connection } from "../dbStrategy/postgres.js";

export class UserRepository {
  static async getUserByEmail(email) {
    return connection.query(
      `SELECT * FROM users WHERE email = ${SqlString.escape(email)}`
    );
  }

  static async getUserById(id) {
    return connection.query(
      `SELECT * FROM users WHERE id = ${SqlString.escape(id)}`
    );
  }

  static async createUser(name, email, password) {
    const query = {
      text: "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      values: [name, email, password],
    };

    return connection.query(query);
  }

  static async getUserFullInfoById(id) {
    const query = {
      text: `SELECT
      users.id,
      users.name,
      SUM(urls.views_count) AS "visitedCount",
      jsonb_agg(jsonb_build_object('id', urls.id, 'shortUrl', urls.shortened_url, 'url', urls.url, 'visitCount', urls.views_count )) AS "shortenedUrls"
    FROM
      users
      JOIN
        urls
        ON urls.user_id = users.id
    WHERE
      users.id = $1
    GROUP BY
      users.id;`,
      values: [id],
    };

    return connection.query(query);
  }
}
