import { UserRepository } from "../repositories/userRepository.js";

export async function listUserInfo(_req, res) {
  const { user } = res.locals;

  try {
    const { rows: userDataArray } = await UserRepository.getUserFullInfoById(
      user.id
    );

    if (!userDataArray[0]) {
      return res.send({
        id: user.id,
        name: user.name,
        visitCount: 0,
        shortenedUrls: [],
      });
    }

    return res.send(userDataArray[0]);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
