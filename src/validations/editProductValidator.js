let { check } = require('express-validator');

module.exports = [
    check('product')
    .notEmpty()
    .withMessage('Debe ingresar el nombre del producto')
    .isLength({min: 3})
    .withMessage('Para completar la edicion debe completar este espacio'),

    check('precio')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio')
    .isNumeric()
    .withMessage('Solo puedes ingresar números'),

    check('category')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check('subCategory')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check('minimumVideo')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check('recommendedVideo')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check ('minumumProcessor')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check ('recommendedProcessor')
    .notEmpty()
    .withMessage('Para terminar la edicion debe completar este espacio'),

    check ('minimumRam')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check ('recommendedRam')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),

    check ('description')
    .notEmpty()
    .withMessage('Para completar la edicion debe completar este espacio'),
]