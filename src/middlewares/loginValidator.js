const { check } = require('express-validator')
const { getUsers } = require('../data/dataBase');
const bcrypt = require('bcryptjs')


const loginValidator = [    
    
    check('email').notEmpty().withMessage('Este campo no puede estar vacio').bail().isEmail().withMessage('Debes introducir el email'),
    check('pass').notEmpty().withMessage('Este campo no puede estar vacio')
    .bail().custom((value, {req}) => {
        let user = getUsers.find(user => user.email === req.body.email)
        return bcrypt.compareSync(value, user.password)
    })
    .withMessage('Contraseña inválida')
    .bail().isLength({ min: 6 }).withMessage('La contraseña debe ser de al menos 6 caracteres')

]

module.exports = loginValidator;