const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const fileUpload = require('../middlewares/multerMiddleware');
const validator = require('../middlewares/loginValidator');

/* Ruta para perfil */
router.get('/perfil', controller.indexProfile);
/* Ruta Register */
router.post('/register', controller.createUser);
/* Ruta Post de Login */
router.post('/login',  controller.checkLogin);

module.exports = router;