let express = require('express');
let router = express.Router();
const controller = require('../../controllers/api/categoriesController');

router.get('/', controller.list);
router.get('/:id', controller.detail);

module.exports = router; 