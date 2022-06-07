const Router = require("express").Router;
const UserController = require("../controllers/user-controller");
const userMiddleware = require("../middleware/user-middleware");
const validationError = require("../middleware/validation-error");

const router = new Router();

router.post(
  "/registration",
  userMiddleware,
  validationError,
  UserController.registration
);
router.post(
  "/login",
  userMiddleware,
  validationError,
  UserController.login
);
router.get("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);

module.exports = router;
