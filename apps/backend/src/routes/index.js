const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

/* AUTH */
router.post('/registration', authController.registration);
router.post('/login', authController.login);

/* USERS (Protected Routes) */
router.get('/users', middlewares.verifyAccessToken, userController.getUsers);

/* ФУНКЦИОНАЛ ДЛЯ АДМИНОВ
router.post('/users', middlewares.verifyAccessToken, userController.createUser);
router.put('/users/:id', middlewares.verifyAccessToken, userController.updateUser);
router.delete('/users/:id', middlewares.verifyAccessToken, userController.deleteUser); */

module.exports = router;