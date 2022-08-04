import joi from "joi";

export const userSignUpSchema = joi.object({
  name: joi.string().required().max(30).trim(),
  email: joi
    .string()
    .required()
    .max(30)
    .trim()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: joi.string().required(),
  confirmPassword: joi.string().required().valid(joi.ref("password")),
});

export const userSignInSchema = joi.object({
  email: joi.string().required().max(30).trim(),
  password: joi.string().required().min(1),
});
