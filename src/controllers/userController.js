const { getUsers, saveUserDb } = require('../data/dataBase');
const { validationResult, cookie } = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports = {

    indexProfile: (req, res) => {

        res.render('users/profile', {userInSession : req.session.userLogged ? req.session.userLogged : '', getUsers});

    },

    indexRegister: (req, res) => {

        res.render('users/register', {userInSession : req.session.userLogged ? req.session.userLogged : ''});

    },

    indexLogin: (req, res) => {

        res.render('users/login', {userInSession : req.session.userLogged ? req.session.userLogged : ''});

    },

    checkLogin: (req, res) => {

        let errors = validationResult(req);

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
                    res.cookie('recordar', userToLog.email, {maxAge: 1000 * 60});
                }

                res.redirect('/user/profile');
            }

        } else {

            res.render('users/login', { dataBase: getUsers, errors: errors.array(), old: req.body, userInSession : req.session.userLogged ? req.session.userLogged : '' });

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
                user: req.body.userName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.pass, 12),
                rol: 1
            }

            getUsers.push(newUser);

            saveUserDb(getUsers);

            res.redirect('/user/login');

        } else {

            res.render('users/register', { dataBase: getUsers, errors: errors.array(), old: req.body, userInSession : req.session.userLogged ? req.session.userLogged : '' });

        }

    },

    logout: (req, res) => {
        req.session.destroy()
        if(req.cookies.userLogged){
            res.cookie('recordar', '', {maxAge: -1})
        }

        res.redirect('/')
    }
    
}