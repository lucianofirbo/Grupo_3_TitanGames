const { body, check } = require('express-validator')
const registerValidator = [
    body('userName').notEmpty().withMessage('Este campo no puede estar vacio').bail().withMessage('Debes introducir el usuario'),
    check('email').notEmpty().withMessage('Este campo no puede estar vacio').bail().isEmail().withMessage('Debes introducir el email').bail()
    .custom(function(value){

        let usuario = getUsers.filter(user=>{ 
            return user.email == value 
        })
        if(usuario == false){ 
            return true 
        }else{
            return false 
        }
     
    }).withMessage('Este email ya está en uso'),
    check('pass').notEmpty().withMessage('Este campo no puede estar vacio').bail().isLength({ min: 6 }).withMessage('La contraseña debe ser de al menos 6 caracteres'),
    body('pass2')
    .custom((value, {req}) => value !== req.body.pass ? false : true)
    .withMessage('Las contraseñas no coinciden')
]

module.exports = registerValidator;