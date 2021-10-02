let { check } = require('express-validator');

module.exports = [
    check('product')
    .notEmpty()
    .withMessage('Debe ingresar el nombre del producto')
    .isLength({min: 3})
    .withMessage('Ingrese más de 3 caracteres'),

    check('precio')
    .notEmpty()
    .withMessage('Coloque un precio')
    .isNumeric()
    .withMessage('Solo puedes ingresar números'),

    check('genero')
    .notEmpty()
    .withMessage('Debe elegir un género'),

    check('subGenero')
    .notEmpty()
    .withMessage('Debe elegir un subgénero'),

    check('minimumVideo')
    .notEmpty()
    .withMessage('Debe ingresar un requisito'),

    check('recommendedVideo')
    .notEmpty()
    .withMessage('Debe ingresar un requisito')
]