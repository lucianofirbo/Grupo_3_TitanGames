const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/adminController')

/* Ruta para añadir, editar stock o eliminar un producto */
router.get('/addProduct', controller.add);

module.exports = router;