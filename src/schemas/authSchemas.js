import joi from "joi";

export const userSignUpSchema = joi.object({
  name: joi.string().required().max(30).min(1),
  email: joi.string().required().max(30).min(1),
  password: joi.string().required().min(1),
  confirmPassword: joi.string().required().valid(joi.ref("password")),
});

export const userSignInSchema = joi.object({
  email: joi.string().required().min(1).max(30),
  password: joi.string().required().min(1),
});
