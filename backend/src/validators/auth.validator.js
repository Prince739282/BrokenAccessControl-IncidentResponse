import { body } from "express-validator";

const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
  .trim()
  .isEmail()
  .withMessage("Enter a valid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];
const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password").notEmpty().withMessage("Password is required"),
];

export { registerValidator, loginValidator};


