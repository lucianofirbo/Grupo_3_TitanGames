const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');

/* Ruta para el home */
router.get('/', controller.index);
/* Ruta para políticas de privacidad */
router.get('/politics', controller.politics);
/* Ruta para Acerca de */
router.get('/about', controller.about);
/* Ruta para la búsqueda */
router.get('/search', controller.search);

module.exports = router;