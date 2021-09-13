const { body, check } = require('express-validator')
const { getUsers } = require('../data/dataBase');
const bcrypt = require('bcryptjs')


const loginValidator = [    

    check('email')
    .notEmpty()
    .isEmail()
    .withMessage('Debes introducir el email'),

    check('pass')
    .notEmpty()
    .withMessage('Debes introducir la contraseña'),

    body('pass')
    .custom((value, {req}) => {
        let user = getUsers.find(user => user.email === req.body.email)
        return bcrypt.compareSync(value, user.password)
    })
    .withMessage('Contraseña inválida')
]

module.exports = loginValidator;