const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController')


/* Ruta con el listado de todos los productos */
router.get('/', controller.index);
/* Ruta para el detalle del producto */
router.get('/detail/:id', controller.detail);
/* Ruta para el carrito de compras */
router.get('/cart', controller.cart);

module.exports = router;