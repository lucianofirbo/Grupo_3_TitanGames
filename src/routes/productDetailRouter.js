const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/productDetailController')

router.get('/', controller.indexProductDetail);

module.exports = router;