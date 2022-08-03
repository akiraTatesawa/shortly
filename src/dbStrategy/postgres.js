import "../config/config.js";

import pg from "pg";

const { Pool } = pg;

const productionConfig = {
  connectionString: process.env.DATABASE_URL,
  ss1: {
    rejectUnauthorized: false,
  },
};

const developmentConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
};

const databaseConfig =
  process.env.NODE_ENV === "dev" ? developmentConfig : productionConfig;

export const connection = new Pool(databaseConfig);
