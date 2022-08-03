// Repositories
import { RankingRepository } from "../repositories/rankingRepository.js";

export async function listRanking(_req, res) {
  try {
    const { rows: ranking } = await RankingRepository.listRanking();

    return res.send(ranking);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
