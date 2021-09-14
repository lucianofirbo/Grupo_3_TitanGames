const express = require ('express');
const router = express.Router();
const controller = require('../controllers/profileController');
const { processRegister } = require('../controllers/usersController');
const registerValidator = require('../validations/registerValidator')

/* Ruta del perfil */
router.get('/profile', controller.indexProfile);
/* Ruta del registro */
router.get('/register', register);
router.post('/register', registerValidator, processRegister)

module.exports = router;