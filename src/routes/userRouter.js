const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const loginValidator = require('../middlewares/loginValidator');

/* Ruta para perfil */
router.get('/profile', controller.indexProfile);
/* Ruta Register */
router.post('/register', controller.createUser);
/* Ruta Post de Login */
router.post('/login', loginValidator, controller.checkLogin);

module.exports = router;