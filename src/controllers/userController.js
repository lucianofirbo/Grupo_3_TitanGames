const { validationResult } = require('express-validator')
const { getUsers, writeUsersJSON } = require('../data/dataBase');
const bcrypt = require('bcryptjs')


module.exports = {
    
    renderRegister: (req, res) => {
        res.render('users/register', {userInSession : req.session.userLogged ? req.session.userLogged : ''})
    },

    indexProfile: (req, res) => {
        res.render('users/profile', {userInSession : req.session.userLogged ? req.session.userLogged : ''});
    },

    renderLogin: (req, res) => {
        res.render('users/login', {
            session: req.session,
            userInSession : req.session.userLogged ? req.session.userLogged : ''
        });
    },

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
                old: req.body,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            })
        }

    },
    
    processLogin: (req, res) => {
        let errors = validationResult(req)

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
                session: req.session,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            })
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        if(req.cookies.TitanGamesUser){
            res.cookie('TitanGamesUser', '', {maxAge: -1})
        }

        res.redirect('/')
    }

}