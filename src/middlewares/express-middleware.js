/* Validations */ 
const { body } = require('express-validator')
const formValidator = [
    body('product').notEmpty().withMessage('Debes introducir el nombre del producto'),
    body('precio').notEmpty().withMessage('Debes introducir el precio del producto'),
    body('genero').notEmpty().withMessage('Debes introducir la categoria del producto'),
    body('subGenero').notEmpty().withMessage('Debes introducir la sub-categoria del producto'),
    body('descripcion').notEmpty().withMessage('Debes introducir una descripcion del producto')
]

module.exports = formValidator;