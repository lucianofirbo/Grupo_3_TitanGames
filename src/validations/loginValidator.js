const { check, body } = require('express-validator');
const { users } = require('../data/dataBase');
//const bcrypt = require('bcryptjs');

module.exports = [
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    body('email')
    .custom(value => {
        let user = users.find(user => user.email === value);

        if (user !== undefined) {
            return true;
        } else {
            return false;
        }
    })
    .withMessage('Email no registrado'),

    check('pass')
    .notEmpty()
    .withMessage('Debes ingresar una contraseña'),

    /* body('pass')
    .custom((value, {req}) => {
        let user = users.find(user => user.email === req.body.email);
         return bcrypt.compareSync(value, user.pass); 
    })
    .withMessage('Contraseña inválida') */
]