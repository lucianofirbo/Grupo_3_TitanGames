const { write } = require('fs');
const path = require('path');
const { getUsers } = require('../data/dataBase');


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
            pass
        } = req.body

        let newUser = {
            id : lastId +1,
            userName,
            email,
            pass,
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
        res.render('register', {
            categories,
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