const Router = require("express").Router;
const userRouter = require('./user-router');
const receptionRouter = require('./reception-router');

const router = new Router();

router.use(userRouter);
router.use(receptionRouter);

module.exports = router;