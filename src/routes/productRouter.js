const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController')

/* Ruta para el detalle del producto */
router.get('/detail', controller.detail);
/* Ruta para el carrito de compras */
router.get('/cart', controller.cart);

module.exports = router;