const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

/* Ruta para perfil */
router.get('/profile', controller.indexProfile);
/* Ruta Register */
router.post('/register', controller.createUser);
/* Ruta Post de Login */
router.post('/login',  controller.checkLogin);

module.exports = router;