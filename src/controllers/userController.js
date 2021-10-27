const { validationResult } = require('express-validator')
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
            include: {association: 'address'}
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
    },

    profileEdit: (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [{association: 'address'}]
        })
        .then(user => {
            res.render('users/profileEdit', {
                user,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            }) 
        })
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
    },

    delete: (req, res) => {
        db.User.destroy({
            where: {
                id: req.session.userLogged.id
            },
            include: [{association: 'Address'}]
        })
        .then(() => {
            res.redirect('/')
        })
    },

    logout: (req, res) => {
        req.session.destroy()
        if(req.cookies.TitanGamesUser){
            res.cookie('TitanGamesUser', '', {maxAge: -1})
        }
        res.redirect('/user/login')
    }

}