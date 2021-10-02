const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const fileUpload = require('../middlewares/multerMiddleware');
const adminCheck = require('../middlewares/adminCheck');
const productValidator = require('../validations/productCreateValidator');

/* Rutas para añadir, editar stock o eliminar un producto */

/* Main Admin */ 
router.get('/', adminCheck, controller.adminMain)

/* Add Product */
router.get('/products', adminCheck, controller.addRender);
router.post('/products', fileUpload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenProducto2', maxCount: 1 },
    { name: 'imagenProducto3', maxCount: 1 },
    { name: 'imagenProducto4', maxCount: 1 },
    { name: 'imagenProducto5', maxCount: 1 }]), productValidator,controller.addProduct);

/* Edit Producto*/
router.get('/editProduct/:id', adminCheck, controller.editRender);
router.put('/editProduct/:id', fileUpload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenProducto2', maxCount: 1 },
    { name: 'imagenProducto3', maxCount: 1 },
    { name: 'imagenProducto4', maxCount: 1 },
    { name: 'imagenProducto5', maxCount: 1 }]), productValidator,controller.editProduct);

/* Delete Product */
router.delete('/deleteProduct/:id', controller.deleteProduct);

module.exports = router;