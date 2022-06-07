const Router = require("express").Router;
const ReceptionController = require('../controllers/reception-controller');
const receptionMiddleware = require("../middleware/reception-middleware");
const validationError = require("../middleware/validation-error");

const router = new Router();

router.get("/getList", ReceptionController.getList);
router.post(
  "/createList",
  receptionMiddleware,
  validationError,
  ReceptionController.createList
);
router.patch(
  "/updateList",
  receptionMiddleware,
  validationError,
  ReceptionController.updateList
);
router.delete("/deleteList", ReceptionController.deleteList);

module.exports = router;