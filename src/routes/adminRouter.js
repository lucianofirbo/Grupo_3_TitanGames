const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const fileUpload = require('../middlewares/multerMiddleware');
const adminCheck = require('../middlewares/adminCheck');
const productValidator = require('../validations/productCreateValidator');
const productEditValidator = require('../validations/editProductValidator');

/* Rutas para añadir, editar stock o eliminar un producto o usuario */

/* Main Admin */ 
router.get('/adminMain/:id', adminCheck, controller.adminMain)

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
    { name: 'imagenProducto5', maxCount: 1 }]), productEditValidator,controller.editProduct);

/* Delete Product */
router.delete('/deleteProduct/:id', controller.deleteProduct);

/* Ruta para administrar usuarios */
router.get('/adminUsers', adminCheck, controller.userAdminRender);
router.put('/userEdit/:id', adminCheck, controller.userAdminEdit);
router.delete('/deleteUserAdmin/:id', adminCheck, controller.deleteUserAdmin);

/* Ruta para buscar usuario como admin */
router.get('/adminSearchUser', adminCheck, controller.adminSearchUser);

/* Ruta para buscar productos como admin */
router.get('/adminSearchProduct', adminCheck, controller.adminSearchProduct);

module.exports = router;