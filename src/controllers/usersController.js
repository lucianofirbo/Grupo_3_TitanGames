const { write } = require('fs');
const path = require('path');
const { getUsers, writeUsersJSON } = require('../data/dataBase');
const { validationResult } = require('express-validator');


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
    },

    renderLogin: (req, res) => {
        res.render('users/login', {
            session: req.session
        });
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)

        if(errors.isEmpty()) {
            let user = getUsers.find(user => user.email === req.body.email)

            req.session.user = {
                id: user.id,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
                rol: user.rol
            }

            if (req.body.recordar) {
                res.cookie("userTitanGames", req.session.user, {expires: new Date(Date.now() + 900000), httpOnly: true});
            }

            res.locals.user = req.session.user
            res.redirect('/users/index');

        } else {
            res.render('users/login', {
                errors: errors.mapped(),
                session: req.session
            })
        }
    }

}