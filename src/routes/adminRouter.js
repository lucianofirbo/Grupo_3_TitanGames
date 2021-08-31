const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const fileUpload = require('../middlewares/multerMiddleware');

/* Rutas para añadir, editar stock o eliminar un producto */

/* Add Product */
router.get('/addProduct', controller.addRender);
router.post('/addProduct', fileUpload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenProducto2', maxCount: 1 },
    { name: 'imagenProducto3', maxCount: 1 },
    { name: 'imagenProducto4', maxCount: 1 },
    { name: 'imagenProducto5', maxCount: 1 }]), controller.addProduct);

/* Edit Producto*/
router.get('/editProduct/:id', controller.editRender);
router.put('/editProduct/:id', fileUpload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenProducto2', maxCount: 1 },
    { name: 'imagenProducto3', maxCount: 1 },
    { name: 'imagenProducto4', maxCount: 1 },
    { name: 'imagenProducto5', maxCount: 1 }]), controller.editProduct);

/* Delete Product */
router.delete('/deleteProduct/:id', controller.deleteProduct);

module.exports = router;