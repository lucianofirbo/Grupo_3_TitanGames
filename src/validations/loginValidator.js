const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

module.exports = [   
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    check('pass')
    .notEmpty()
    .withMessage('Debes ingresar tu contraseña'),

    body('pass')
    .custom((value, {req})=> {
        return db.User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then(user => {
            if(!bcrypt.compareSync(value, user.dataValues.pass)){
                return Promise.reject()
            }
        })
        .catch((err) => {
            return Promise.reject("Contraseña incorrecta")
        })
    })
]