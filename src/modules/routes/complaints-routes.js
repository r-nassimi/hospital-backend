const Router = require("express").Router;
const UserController = require("/home/user/Documents/Work/hospital-backend-node/src/modules/controllers/user-controller");

const router = new Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);

module.exports = router;