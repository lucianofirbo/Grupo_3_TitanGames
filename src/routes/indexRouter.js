const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');
let cookieCheck = require('../middlewares/cookieCheck');
/* Ruta para el home */
router.get('/', cookieCheck, controller.index);
/* Ruta para políticas de privacidad */
router.get('/politics', controller.politics);
/* Ruta para Acerca de */
router.get('/about', controller.about);
/* Ruta para la búsqueda */
router.get('/search', controller.search);
/* Ruta para busqueda por precio */
router.get('/searchPrice/:price', controller.searchPrice);
/* Ruta para busuqeda de ofertas */
router.get('/searchPrice/:price', controller.searchPrice);


module.exports = router;