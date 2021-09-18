const { validationResult } = require('express-validator')
const { users, writeUsersJSON } = require('../data/dataBase');
const bcrypt = require ('bcryptjs')


module.exports = {
    //Creacion de usuarios

    processRegister: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
        let lastId = 0;

        users.forEach(user => {
            if (user.id > lastId) {
                lastId = user.id
            }
        })

        let {
            userName,
            email,
            pass1
        } = req.body

        let newUser = {
            id : lastId +1,
            userName,
            email,
            pass : bcrypt.hashSync(pass1, 10),
            category: "user",
            avatar: req.file ? req.file.filename : "logo-footer.png",
            address: "",
            postalCode: "",
            province: "",
            city: ""
        }

        users.push(newUser)

        writeUsersJSON(users)

        res.redirect('/users/login')

    } else {
        res.render('/users/register', {
            errors: errors.mapped(),
            old: req.body
        })
    }

},

renderRegister: (req, res) => {
    res.render('users/register')
},

indexProfile: (req, res) => {
    res.render('users/profile');
}

}