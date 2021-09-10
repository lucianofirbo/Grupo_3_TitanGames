/* Validations */ 
const { body } = require('express-validator')
const formValidator = [
    body('product').notEmpty().withMessage('Debes introducir el nombre del producto'),
    body('precio').notEmpty().withMessage('Debes introducir el precio del producto'),
    body('genero').notEmpty().withMessage('Debes introducir la categoria del producto'),
    body('subGenero').notEmpty().withMessage('Debes introducir la sub-categoria del producto'),
    body('descripcion').notEmpty().withMessage('Debes introducir una descripcion del producto'),
    body('minimumVideo').notEmpty().withMessage('Debes introducir requisito del producto'),
    body('minimumProcessor').notEmpty().withMessage('Debes introducir requisito del producto'),
    body('minimumRam').notEmpty().withMessage('Debes introducir requisito del producto'),
    body('recommendedVideo').notEmpty().withMessage('Debes introducir requisito del producto'),
    body('recommendedProcessor').notEmpty().withMessage('Debes introducir requisito del producto'),
    body('recommendedRam').notEmpty().withMessage('Debes introducir requisito del producto')
]

module.exports = formValidator;