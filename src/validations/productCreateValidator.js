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

    check('category')
    .notEmpty()
    .withMessage('Debe elegir un género'),

    check('subCategory')
    .notEmpty()
    .withMessage('Debe elegir un subgénero'),

    check('minimumVideo')
    .notEmpty()
    .withMessage('Debe ingresar un requisito'),

    check('recommendedVideo')
    .notEmpty()
    .withMessage('Debe ingresar un requisito'),

    check ('minumumProcessor')
    .notEmpty()
    .withMessage('Debe ingresar un requisito'),

    check ('recommendedProcessor')
    .notEmpty()
    .withMessage('Debe ingresar un requisito'),

    check ('minumumRam')
    .notEmpty()
    .withMessage('Debe ingresar un requisito'),

    check ('recommendedRam')
    .notEmpty()
    .withMessage('Debe ingresar un requisito'),

    check ('description')
    .notEmpty()
    .withMessage('Debe contener alguna descripción'),
]