const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/adminController')

/* Rutas para añadir, editar stock o eliminar un producto */

/* Add Product */
router.get('/addProduct', controller.addRender);
router.post('/addProduct', controller.addProduct);

/* Edit Producto*/
router.get('/editProduct/:id', controller.editRender);
router.put('/editProduct/:id', controller.editProduct);

router.delete('/deleteProduct/:id', controller.deleteProduct);

module.exports = router;