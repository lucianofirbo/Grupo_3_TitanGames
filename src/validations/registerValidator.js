const { check, body } = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('userName')
    .notEmpty()
    .withMessage('Debes escribir un nombre de usuario')
    .isLength({min: 3})
    .withMessage('El nombre debe tener al menos 3 caracteres'),
    
     check('email')
    .notEmpty()
    .withMessage('Debes escribir un email').bail()
    .isEmail()
    .withMessage('Debes escribir un email válido'),

    body('email').custom(value => {
          return db.User.findOne({
              where : {
                  email : value
              }
          })
          .then(user => {
              if(user){
                  return Promise.reject('Email ya está registrado')
              }
          })
      }),

    check('pass1')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/)
    .withMessage('La contraseña debe contener al menos 6 caracteres, una mayúscula y un número'),
    
    body('pass2')
    .custom((value, {req}) => value !== req.body.pass1 ? false : true)
    .withMessage('Las contraseñas no coinciden'),

]
