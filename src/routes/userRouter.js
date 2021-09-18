const express = require ('express');
const router = express.Router();
const { processRegister,
        indexProfile, 
        renderRegister } = require('../controllers/userController');
const uploadAvatar = require ('../middlewares/uploadAvatar');
const registerValidator = require('../validations/registerValidator');



/* Ruta del perfil */
router.get('/profile', indexProfile);
/* Ruta del registro */
router.get('/register', renderRegister);
router.post('/register', registerValidator, processRegister);

/* Ruta para login */
router.get('/login', renderLogin);
router.post('/login', loginValidator ,processLogin);

module.exports = router;