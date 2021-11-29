let express = require('express');
let router = express.Router();
const controller = require('../../controllers/api/UsersController');

router.get('/users', controller.list);
router.get('/users/:id', controller.detail);

module.exports = router; 