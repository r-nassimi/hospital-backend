const express = require('express');
const userController = require('../Modules/Controllers/user-controller');
const router = express.Router();

const {
    getAllComplaints,
    createComplaint,
    changeComplaint,
    deleteComplaint
} = require('../Modules/Controllers/user-controller');

router.post('/registartion', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout)
router.get('refresh', userController.refresh)

module.exports = router;