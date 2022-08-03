import "./config/config.js";

import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";

import { authRouter } from "./routes/authRouter.js";
import { urlsRouter } from "./routes/urlsRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { rankingRouter } from "./routes/rankingRouter.js";

const server = express();

server.use(json());
server.use(cors());

server.use(authRouter);
server.use(urlsRouter);
server.use(userRouter);
server.use(rankingRouter);

const { PORT } = process.env;

server.listen(PORT, () => {
  console.log(chalk.bgGreen.white.bold(`Server is running on port ${PORT}`));
});
