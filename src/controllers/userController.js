const { validationResult } = require('express-validator')
const { getUsers, writeUsersJSON } = require('../data/dataBase');
const bcrypt = require('bcryptjs');
const db = require('../database/models');


module.exports = {
    
    renderRegister: (req, res) => {
        res.render('users/register', {userInSession : req.session.userLogged ? req.session.userLogged : ''})
    },

    indexProfile: (req, res) => {
        db.User.findOne({
            where: {
                id: req.session.userLogged.id
            },
            include: {association: 'adress'}
        })
        .then(user => {     
            console.log(user.adress)       
            res.render('users/profile', {userInSession : req.session.userLogged ? req.session.userLogged : '', user});
        })
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
            db.User.create ({
                userName: req.body.userName,
                email: req.body.email,
                pass: bcrypt.hashSync(req.body.pass1, 10),
                rol: 0,                
                avatar: "default_user.jpg"
            })
            .then(() => {
                res.redirect('/user/login');
            })
            .catch((err) => console.log(err));
        } else {
            res.render('users/register', {
                errors: errors.mapped(),
                old: req.body,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            })
        }

        /*
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
                avatar: req.file ? req.file.filename : "default_user.jpg",
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
        }*/
    },
    
    processLogin: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then (user => {
                req.session.userLogged = {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    rol: user.rol,
                    avatar: user.avatar
                }
                if (req.body.recordar) {
                    res.cookie('TitanGamesUser', req.session.userLogged, { expires: new Date(Date.now() + 900000), httpOnly: true });
                }
                res.locals.user = req.session.userLogged
                res.redirect('/');
            })
        } else {
            res.render('users/login', {
                errors: errors.mapped(),
                session: req.session,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            })
        }

        /*let errors = validationResult(req)

        if (errors.isEmpty()) {
            let userToLog = getUsers.find(user => user.email === req.body.email);   
            req.session.userLogged = {
                id: userToLog.id,
                userName: userToLog.userName,
                email: userToLog.email,
                avatar: userToLog.avatar,
                rol: userToLog.rol
            }
            if (req.body.recordar) {
                res.cookie('TitanGamesUser', req.session.userLogged, { expires: new Date(Date.now() + 900000), httpOnly: true });
            }
            res.redirect('/');

        } else {
            res.render('users/login', {
                errors: errors.mapped(),
                session: req.session,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            })
        }*/
    },

    profileEdit: (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [{association: 'adress'}]
        })
        .then(user => {
            res.render('users/profileEdit', {
                user,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            }) 
        })

        /* let user = getUsers.find(user => user.id === +req.params.id)
        res.render('users/profileEdit', {
            user,
            userInSession : req.session.userLogged ? req.session.userLogged : ''
        }) */
    },

    updateProfile: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.User.update({
                userName: req.body.userName,
                email: req.body.email,
                avatar: req.file ? req.file.filename : req.session.userLogged.avatar
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                const adressUser = db.Address.findOne({
                    where: {
                        userId: req.params.id
                    }
                })
                .then(() => {
                    return true
                })
                .catch(error => {
                    return false
                });
                if (adressUser == true) {
                    db.Address.update({
                        street: req.body.address,
                        city: req.body.city,
                        province: req.body.province,
                        postalCode: req.body.postalCode
                    }, {
                        where: {
                            userId: req.params.id
                        }
                    })
                    .then(() => {
                        res.redirect('/admin/products');
                    })
                } else {
                    db.Address.create({
                        street: req.body.address,
                        city: req.body.city,
                        province: req.body.province,
                        postalCode: req.body.postalCode,
                        userId: req.params.id
                    })
                    .then(() => {
                        res.redirect('/admin/products');
                    })
                }
            })
        } else {
            res.send('error')
        }

        /* let errors = validationResult(req)
        if (errors.isEmpty()) {
            let user = getUsers.find(user => user.id === +req.params.id)
            let {
                userName,
                email,
                address,
                postalCode,
                province,
                city,
            } = req.body
            user.userName = userName
            user.email = email
            user.address = address
            user.postalCode = postalCode
            user.province = province
            user.city = city
            user.avatar = req.file ? req.file.filename : user.avatar
            writeUsersJSON(getUsers)
            delete user.pass
            req.session.user = user
            res.redirect('/user/profile')
        }else{
            res.render('users/profileEdit', {
                errors: errors.mapped(),
                old: req.body, 
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            })
        } */
    },

    logout: (req, res) => {
        req.session.destroy()
        if(req.cookies.TitanGamesUser){
            res.cookie('TitanGamesUser', '', {maxAge: -1})
        }
        res.redirect('/user/login')
    }

}