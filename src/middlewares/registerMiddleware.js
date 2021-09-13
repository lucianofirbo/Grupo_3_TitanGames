const { body } = require('express-validator')
const registerValidator = [
    body('user').notEmpty().isEmail().withMessage('Debes introducir el usuario'),
    body('email').notEmpty().isEmail().withMessage('Debes introducir el email'),
    body('pass').notEmpty().withMessage('Debes introducir la contraseña')
]

module.exports = registerValidator;