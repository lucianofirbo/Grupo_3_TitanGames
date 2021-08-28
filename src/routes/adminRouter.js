const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/adminController')

/* Rutas para añadir, editar stock o eliminar un producto */

router.get('/addProduct', controller.addRender);
/*router.post('/addProduct', controller.add);*/
router.post('/addProduct', (req, res) => {
    console.log(req.body);
});

router.get('/editProduct', controller.edit);

module.exports = router;