const Router = require('express').Router;

const router = new Router();

const {
    getList,
    createList,
    updateList,
    deleteList
  } = require('../controllers/reception-controller');
  
  router.post('/getList', getList);
  router.get('/createList', createList);
  router.patch('updateList', updateList);
  router.delete('/deleteList', deleteList);

  module.exports = router;