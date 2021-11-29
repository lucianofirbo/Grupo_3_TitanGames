const { check } = require('express-validator');

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('Debe ingresar el nombre de la categoría')
    .isLength({min: 3})
    .withMessage('El nombre debe tener más de 3 caracteres'),
]