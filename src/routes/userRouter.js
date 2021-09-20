const express = require ('express');
const router = express.Router();
const { processRegister,
        indexProfile, 
        renderRegister,
        renderLogin,
        processLogin } = require('../controllers/userController');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const userCheck = require('../middlewares/userCheck');
const userLoginCheck = require('../middlewares/userLoginCheck');

/* Ruta del perfil */
router.get('/profile', userCheck, indexProfile);
/* Ruta del registro */
router.get('/register', userLoginCheck, renderRegister);
router.post('/register', registerValidator, processRegister);

/* Ruta para login */
router.get('/login', userLoginCheck, renderLogin);
router.post('/login', loginValidator ,processLogin);

module.exports = router;