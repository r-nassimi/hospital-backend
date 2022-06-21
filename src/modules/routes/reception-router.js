const Router = require("express").Router;
const ReceptionController = require("../controllers/reception-controller");
const receptionMiddleware = require("../middleware/reception-middleware");
const dataMiddleware = require("../middleware/data-middleware");
const authorizationMiddleware = require("../middleware/authorization-middleware");
const tokenMiddleware = require("../middleware/token-middleware");

const router = new Router();

router.get(
  "/getList",
  authorizationMiddleware,
  tokenMiddleware,
  ReceptionController.getList
);
router.post(
  "/createList",
  authorizationMiddleware,
  tokenMiddleware,
  receptionMiddleware,
  dataMiddleware,
  ReceptionController.createList
);
router.patch(
  "/updateList",
  authorizationMiddleware,
  receptionMiddleware,
  dataMiddleware,
  ReceptionController.updateList
);
router.delete(
  "/deleteList",
  authorizationMiddleware,
  ReceptionController.deleteList
);

module.exports = router;