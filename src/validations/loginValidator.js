const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');
let db = require("../database/models");

module.exports = [

    check("email")
        .notEmpty()
        .withMessage("Debes escribir un email")
        .bail()
        .isEmail()
        .withMessage("Debes escribir un email válido"),

    body("custom").custom((value, { req }) => {
        return db.User.findOne({
            where: {
                email: req.body.email,
            },
        })
        .then((user) => {
            if (!bcrypt.compareSync(req.body.pass, user.dataValues.pass)) {
                return Promise.reject();
            }
        })
        .catch((error) => {
            return Promise.reject("Credenciales inválidas");
        })
    })

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
]