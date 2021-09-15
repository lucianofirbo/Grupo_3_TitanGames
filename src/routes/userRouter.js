const express = require ('express');
const router = express.Router();
const { processRegister, indexProfile, renderRegister } = require('../controllers/usersController');
const uploadAvatar = require ('../middlewares/uploadAvatar')


/* Ruta del perfil */
router.get('/profile', indexProfile);
/* Ruta del registro */
router.get('/register', renderRegister);
//router.post('/register',uploadAvatar.single('avatar'), registerValidator, processRegister)

module.exports = router;