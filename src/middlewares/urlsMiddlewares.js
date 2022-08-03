import { urlSchema } from "../schemas/urlsSchemas.js";

export function validateUrlBody(req, res, next) {
  const { error } = urlSchema.validate(req.body);

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  return next();
}
