const express = require('express');
const router = express.Router();

/* USERS */
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

/* AUTH */
const authController = require('../controllers/authController');

router.get('/registration', authController.registration);
router.post('/login', authController.login);

module.exports = router;
