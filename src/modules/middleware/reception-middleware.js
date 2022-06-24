const { check } = require("express-validator");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Поле имени должно быть заполнено!")
    .isLength({ max: 200 })
    .withMessage("Вы превысили допустимое количество символов")
    .matches(/^([\S]+[a-zа-я\d\-_]*[\s]{0,1})*[\S]$/i)
    .withMessage("Проверьте введённые данные и повторите снова!"),

  check("doctor")
    .notEmpty()
    .withMessage("Поле врача должно быть заполнено!")
    .isLength({ max: 100 })
    .withMessage("Вы превысили допустимое количество символов"),

  check("date")
    .notEmpty()
    .withMessage("Поле даты должно быть заполнено!")
    .isLength({ max: 100 })
    .withMessage("Вы превысили допустимое количество символов"),

  check("complaint")
    .notEmpty()
    .withMessage("Поле жалобы должно быть заполнено!")
    .isLength({ max: 200 })
    .withMessage("Вы превысили допустимое количество символов")
    .matches(/^([\S]+[a-zа-я\d\-_]*[\s]{0,1})*[\S]$/i)
    .withMessage("Проверьте введённые данные и повторите снова!"),
];