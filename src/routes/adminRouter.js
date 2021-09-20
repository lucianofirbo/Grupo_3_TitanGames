const express = require('express');
const router = express.Router();
const validator = require('../middlewares/express-middleware');
const controller = require('../controllers/adminController');
const fileUpload = require('../middlewares/multerMiddleware');
let adminCheck = require('../middlewares/adminCheck');


/* Main Admin */ 
router.get('/', adminCheck, controller.adminMain);

/* Add Product */
router.get('/products', adminCheck, controller.addRender);
router.post('/products', fileUpload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenProducto2', maxCount: 1 },
    { name: 'imagenProducto3', maxCount: 1 },
    { name: 'imagenProducto4', maxCount: 1 },
    { name: 'imagenProducto5', maxCount: 1 }]), validator, controller.addProduct);

/* Edit Product */
router.get('/editProduct/:id',  adminCheck, controller.editRender);
router.put('/editProduct/:id', fileUpload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenProducto2', maxCount: 1 },
    { name: 'imagenProducto3', maxCount: 1 },
    { name: 'imagenProducto4', maxCount: 1 },
    { name: 'imagenProducto5', maxCount: 1 }]), controller.editProduct);

/* Delete Product */
router.delete('/deleteProduct/:id', controller.deleteProduct);

module.exports = router;