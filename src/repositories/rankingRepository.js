// Postgres Connection
import { connection } from "../dbStrategy/postgres.js";

export class RankingRepository {
  static async listRanking() {
    const text = `
    SELECT
        users.id,
        users.name,
        COUNT(urls.id) AS "linksCount",
        COALESCE(SUM(urls.views_count), 0) AS "visitCount"
    FROM
        users
        LEFT JOIN
            urls
            ON urls.user_id = users.id
    GROUP BY
        users.id
    ORDER BY
        "visitCount" DESC
    LIMIT 10`;

    return connection.query(text);
  }
}
