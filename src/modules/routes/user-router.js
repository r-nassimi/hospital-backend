const Router = require("express").Router;
const UserController = require("../controllers/user-controller");
const userMiddleware = require("../middleware/user-middleware");
const dataMiddleware = require("../middleware/data-middleware");

const router = new Router();

router.post(
  "/registration",
  userMiddleware,
  dataMiddleware,
  UserController.registration
);
router.post(
  "/login",
  userMiddleware,
  dataMiddleware,
  UserController.login
);
router.get(
  "/logout", 
  UserController.logout
);
router.get(
  "/refresh",
  UserController.refresh
);

module.exports = router;