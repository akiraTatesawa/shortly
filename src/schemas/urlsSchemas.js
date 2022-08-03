import Joi from "joi";

export const urlSchema = Joi.object({
  url: Joi.string().url().required(),
});
