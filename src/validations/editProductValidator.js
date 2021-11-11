let { check } = require('express-validator');

module.exports = [
    check('product')
    .notEmpty()
    .withMessage('Debe ingresar el nombre del producto')
    .isLength({min: 5})
    .withMessage('El nombre debe tener más de 5 caracteres'),

    check('precio')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check('genero')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check('subGenero')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check('minimumVideo')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check('recommendedVideo')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check('minimumProcessor')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check('minimumRam')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check('descripcion')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio')
    .isLength({min: 20})
    .withMessage('Debes ingresar una descripción de al menos 20 caracteres')
]