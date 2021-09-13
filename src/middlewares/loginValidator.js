const { body } = require('express-validator')
const loginValidator = [
    body('email').notEmpty().isEmail().withMessage('Debes introducir el email'),
    body('password').notEmpty().withMessage('Debes introducir la contraseña')
]

module.exports = loginValidator;