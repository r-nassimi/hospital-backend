const Router = require("express").Router;
const UserController = require("../controllers/user-controller");
const ReceptionController = require('../controllers/reception-controller');
const validatorMiddleware = require('../middleware/validator-middleware');
const receptionMiddleware = require('../middleware/reception-middleware');

const router = new Router();

router.post("/registration", [validatorMiddleware], UserController.registration),
router.post("/login", [validatorMiddleware], UserController.login);
router.get("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);

router.get('/getList', ReceptionController.getList);
router.post('/createList', [receptionMiddleware], ReceptionController.createList);
router.patch('/updateList', [receptionMiddleware], ReceptionController.updateList);
router.delete('/deleteList', ReceptionController.deleteList);

module.exports = router;