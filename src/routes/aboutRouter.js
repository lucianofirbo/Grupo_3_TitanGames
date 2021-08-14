const express = require('express');
const router = express.Router();
const controller = require('../controllers/aboutController');

router.get('/', controller.indexAbout);

module.exports = router;