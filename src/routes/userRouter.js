const express = require ('express');
const router = express.Router();
const { processRegister,
        indexProfile, 
        renderRegister,
        renderLogin,
        processLogin,
        profileEdit,
        updateProfile,
        logout } = require('../controllers/userController');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const userCheck = require('../middlewares/userCheck');
const userLoginCheck = require('../middlewares/userLoginCheck');
const cookieCheck = require('../middlewares/cookieCheck');
const uploadUserAvatar = require('../middlewares/multerUserAvatar');

/* Ruta del perfil */
router.get('/profile', userCheck, indexProfile);

/* Ruta del registro */
router.get('/register', userLoginCheck, renderRegister);
router.post('/register', registerValidator, processRegister);

/* Ruta para login */
router.get('/login', userLoginCheck, renderLogin);
router.post('/login',/* loginValidator, cookieCheck, */processLogin);

/* Ruta para la edicion del perfil */
router.get('/profile/edit/:id', userCheck, profileEdit);
router.put('/profile/edit/:id', uploadUserAvatar.single('avatar'), updateProfile);

/* Ruta Logout */
router.get('/logout', userCheck, logout);

module.exports = router;