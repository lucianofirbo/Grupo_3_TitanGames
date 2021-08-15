const express = require('express');
const router = express.Router();
const controller = require('../controllers/privacyPoliticsController');

router.get('/', controller.indexPrivacyPolitics);

module.exports = router;