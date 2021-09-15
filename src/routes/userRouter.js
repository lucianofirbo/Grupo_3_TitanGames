const express = require ('express');
const router = express.Router();
const { processRegister, indexProfile, renderRegister, renderLogin, processLogin } = require('../controllers/usersController');
const uploadAvatar = require ('../middlewares/uploadAvatar');
const loginValidator = require('../validations/loginValidator');

/* Ruta del perfil */
router.get('/profile', indexProfile);
/* Ruta del registro */
router.get('/register', renderRegister);
//router.post('/register',uploadAvatar.single('avatar'), registerValidator, processRegister)
/* Ruta para login */
router.get('/login', renderLogin);
router.post('/login', loginValidator ,processLogin);

module.exports = router;