const { validationResult } = require('express-validator')
const { getUsers, writeUsersJSON } = require('../data/dataBase');
const bcrypt = require('bcryptjs')


module.exports = {
    //Creacion de usuarios

    processRegister: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let lastId = 0;

            getUsers.forEach(user => {
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
                id: lastId + 1,
                userName,
                email,
                pass: bcrypt.hashSync(pass1, 10),
                category: "user",
                avatar: req.file ? req.file.filename : "logo-footer.png",
                address: "",
                postalCode: "",
                province: "",
                city: "",
                rol: 0
            }

            getUsers.push(newUser)

            writeUsersJSON(getUsers)

            res.redirect('/user/login')
        } else {
            res.render('users/register', {
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
        console.log(errors)

        if (errors.isEmpty()) {

            let userToLog;

            getUsers.filter(user => {
                if (user.email == req.body.email) {
                    userToLog = user;
                }
            })     

            if (userToLog == undefined) {

                res.send('no existe ese usuario')

            } else {

                req.session.userLogged = userToLog;

                if (req.body.recordar != undefined) {
                    res.cookie('TitanGamesUser', userToLog.email, { expires: new Date(Date.now() + 900000), httpOnly: true });
                }

                res.redirect('/');
            } 

        } else {
            res.render('users/login', {
                errors: errors.mapped(),
                session: req.session
            })
        }
    }

}