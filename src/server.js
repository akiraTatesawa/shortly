import "./config/config.js";

import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

const server = express();

server.use(json());
server.use(cors());

server.listen(process.env.PORT, () => {
  console.log(
    chalk.bgGreen.white.bold(`Server is running on port ${process.env.PORT}`)
  );
});
