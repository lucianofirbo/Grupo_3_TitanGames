let { check } = require('express-validator');

module.exports = [
    check('product')
    .notEmpty()
    .withMessage('Debe ingresar el nombre del producto')
    .isLength({min: 5})
    .withMessage('Ingrese más de 3 caracteres'),

    check('precio')
    .notEmpty()
    .withMessage('Coloque un precio'),

    check('genero')
    .notEmpty()
    .withMessage('Debe elegir un género'),

    check('subGenero')
    .notEmpty()
    .withMessage('Debe elegir un subgénero'),

    check('minimumVideo')
    .notEmpty()
    .withMessage('Debe ingresar un requisito'),

    check ('minimumProcessor')
    .notEmpty()
    .withMessage('Debe ingresar un requisito'),

    check ('minimumRam')
    .notEmpty()
    .withMessage('Debe ingresar un requisito'),

    check('recommendedVideo')
    .notEmpty()
    .withMessage('Debe ingresar un requisito'),

    check ('descripcion')
    .notEmpty()
    .withMessage('Debe contener alguna descripción')
    .isLength({min: 20})
    .withMessage('Debes ingresar una descripción de al menos 20 caracteres')
]