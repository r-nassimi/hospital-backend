const Router = require("express").Router;
const UserController = require("../controllers/user-controller");
const validatorMiddleware = require('../middleware/validator-middleware');

const router = new Router();

router.post("/registration", validatorMiddleware, UserController.registration),
router.post("/login", validatorMiddleware, UserController.login);
router.get("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);

module.exports = router;