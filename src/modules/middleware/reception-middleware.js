const { check } = require("express-validator");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Поле имени должно быть заполнено!")
    .isLength({ max: 200 })
    .withMessage("Вы превысили допустимое значение символов"),

  check("doctor")
    .notEmpty()
    .withMessage("Поле врача должно быть заполнено!")
    .isLength({ max: 100 })
    .withMessage("Вы превысили допустимое значение символов"),

  check("date")
    .notEmpty()
    .withMessage("Поле даты должно быть заполнено!")
    .isLength({ max: 100 })
    .withMessage("Вы превысили допустимое значение символов"),

  check("complaint")
    .notEmpty()
    .withMessage("Поле жалобы должно быть заполнено!")
    .isLength({ max: 200 })
    .withMessage("Вы превысили допустимое значение символов"),
];