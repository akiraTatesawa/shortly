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
    return id;
  }
}
