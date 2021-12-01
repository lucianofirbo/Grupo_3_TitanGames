const express = require ('express');
const router = express.Router();
const controller = require('../controllers/userController');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const userCheck = require('../middlewares/userCheck');
const userLoginCheck = require('../middlewares/userLoginCheck');
const cookieCheck = require('../middlewares/cookieCheck');
const uploadUserAvatar = require('../middlewares/multerUserAvatar');

/* Ruta del perfil */
router.get('/profile', userCheck, controller.indexProfile);

/* Ruta del registro */
router.get('/register', userLoginCheck, controller.renderRegister);
router.post('/register', registerValidator, controller.processRegister);

/* Ruta para login */
router.get('/login', userLoginCheck, controller.renderLogin);
router.post('/login', loginValidator, cookieCheck, controller.processLogin);

/* Ruta para la edicion del perfil */
router.get('/profile/edit/:id', userCheck, controller.profileEdit);
router.put('/profile/edit/:id', uploadUserAvatar.single('avatar'), controller.updateProfile);

/* Ruta para eliminar perfil */
router.delete('/profile/delete/:id', controller.delete);

/* Ruta Logout */
router.get('/logout', userCheck, controller.logout);

/* Ruta para añadir producto al carrito */
router.get('/addToCart/:id', userCheck, controller.addToCart);

/* Ruta para eliminar producto de carrito */
router.delete('/deleteProductCart/:id', userCheck, controller.deleteProductCart);

module.exports = router;