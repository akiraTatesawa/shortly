import { Router } from "express";

// Controllers
import { listRanking } from "../controllers/rankingController.js";

export const rankingRouter = Router();

rankingRouter.get("/ranking", listRanking);
