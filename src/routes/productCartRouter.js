const express = require('express');
const router = express.Router();
const controller = require('../controllers/productCartController');

router.get('/', controller.indexProductCart);

module.exports = router;