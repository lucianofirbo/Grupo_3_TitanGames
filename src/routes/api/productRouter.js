let express = require('express');
let router = express.Router();
const controller = require('../../controllers/api/productController');

router.get('/products', controller.list);
router.get('/products/:id', controller.detail);
router.post('/products', controller.create);

module.exports = router; 