const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const loginValidator = require('../middlewares/loginValidator');
const registerValidator = require('../middlewares/registerMiddleware');
const sessionCheck = require('../middlewares/userCheck');
const userLoginCheck = require('../middlewares/userLoginCheck');

/* Ruta para perfil */
router.get('/profile', sessionCheck, controller.indexProfile);
/* Ruta Get Register */
router.get('/register', userLoginCheck, controller.indexRegister);
/* Ruta Get Login */
router.get('/login', userLoginCheck, controller.indexLogin);
/* Ruta Post Register */
router.post('/register', registerValidator, controller.createUser);
/* Ruta Post de Login */
router.post('/login', loginValidator, controller.checkLogin);
/* Ruta Logout */
router.get('/logout', userLoginCheck, controller.logout);

module.exports = router;