const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/adminController');
const multer = require('multer');

let multerDiskStorage = multer.diskStorage({

    destination: (req, file, callback) => {

        callback(null, path.join(__dirname, '../../public/img/games'));

    },

    filename: (req, file, callback) => {

        callback(null, 'product-' + Date.now() + path.extname(file.originalname));

    }

});
let fileUpload = multer({storage: multerDiskStorage});

/* Rutas para añadir, editar stock o eliminar un producto */

/* Add Product */
router.get('/addProduct', controller.addRender);
router.post('/addProduct', fileUpload.single('imagenProducto'), controller.addProduct);

/* Edit Producto*/
router.get('/editProduct/:id', controller.editRender);
router.put('/editProduct/:id', fileUpload.single('imagenProducto'), controller.editProduct);

/* Delete Product */
router.delete('/deleteProduct/:id', controller.deleteProduct);

module.exports = router;