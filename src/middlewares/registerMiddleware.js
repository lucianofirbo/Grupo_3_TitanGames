const { body } = require('express-validator')
const registerValidator = [
    body('user').notEmpty().withMessage('Debes introducir el usuario'),
    body('email').notEmpty().isEmail().withMessage('Debes introducir el email'),
    body('pass').notEmpty().isLength({ min: 5 }).withMessage('Debes introducir la contraseña y esta debe ser de al menos 6 caracteres')
]

module.exports = registerValidator;