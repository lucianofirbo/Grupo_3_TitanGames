const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/productLoadController')

router.get('/', controller.indexProductLoad);

module.exports = router;