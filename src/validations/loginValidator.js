const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

module.exports = [
    
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

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
            return Promise.reject("Email o contraseña incorrectos")
        })
    })
]
    /*check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    body('email')
    .custom(value => {
        let user = getUsers.find(user => user.email === value);

        if (user !== undefined) {
            return true;
        } else {
            return false;
        }
    })
    .withMessage('Email no registrado'),*/