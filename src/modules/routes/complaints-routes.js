const Router = require('express').Router;
const path = ('/home/user/Documents/Work/hospital-backend-node/');
const UserController = require(path + "src/modules/controllers/user-controller");
const authMiddleware = require(path + 'src/modules/middleware/authorization-middleware');

const router = new Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers)

module.exports = router;