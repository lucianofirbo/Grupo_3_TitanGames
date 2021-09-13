const { getUsers, saveUserDb } = require('../data/dataBase');
const { validationResult, cookie } = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports = {

    indexProfile: (req, res) => {

        res.render('users/profile');

    },

    checkLogin: (req, res) => {

        let errors = validationResult(req);
        console.log(errors)

        if (errors.isEmpty()) {

            let userToLog;

            getUsers.filter(user => {
                if (user.email == req.body.email) {
                    userToLog = user;
                }
            })            

            if (userToLog == undefined) {

                return res.render('login', {
                    errors: [
                        { msg: 'credenciales invalidas' }
                    ]
                })

            } else {

                req.session.userLogged = userToLog;

                if (req.body.recordar != undefined) {
                    res.cookie('recordar', userToLog.email);
                }

                res.render('users/profile');
            }

        } else {

            res.send('xd');

        }

        

    },

    createUser: (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let lastId = 1;
            getUsers.forEach(element => {
                if (element.id > lastId) {
                    lastId = element.id;
                };
            })

            let newUser = {
                id: lastId + 1,
                user: req.body.user,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.pass, 12)
            }

            getUsers.push(newUser);

            saveUserDb(getUsers);

            res.redirect('/')

        } else {
            
            res.send('xd');

        }

    }

}