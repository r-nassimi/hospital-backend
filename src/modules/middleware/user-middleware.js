const { check } = require("express-validator");

module.exports = [
  check("login")
    .isLength({ min: 6 })
    .withMessage("Логин должен содержать не менее 6 символов!")
    .notEmpty()
    .withMessage("Логин не должен быть пустым!")
    .isAlphanumeric()
    .withMessage("Логин обязательно должен содержать буквы и цифры!"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Пароль должен содержать не менее 6 символов!")
    .notEmpty()
    .withMessage("Пароль не должен быть пустым!")
    .isAlphanumeric()
    .withMessage(
      "Пароль обязательно должен содержать буквы и цифры!"
    ),
];
