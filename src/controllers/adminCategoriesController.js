const { validationResult } = require('express-validator');
const db = require('../database/models');

module.exports = {
    categories: (req, res) => {
        db.Category.findAll().then((categories) => {
            res.render('admin/category', {
                categories,
                userInSession: req.session.userLogged ? req.session.userLogged : ''
            });            
        });
    },
    categoryCreateForm: (req, res) => {
        res.render('admin/categoryForm', {
            userInSession: req.session.userLogged ? req.session.userLogged : ''
        });
    },
    categoryStore: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            db.Category.create({
                name: req.body.name
            })
            .then((result) => {
                res.redirect('/admin/categories');
            })
            .catch((error) => console.log(error));
        } else {
            res.render('categoryForm', {
                errors: errors.mapped(),
                old: req.body,
                userInSession: req.session.userLogged ? req.session.userLogged : ''
            })
        }
    },
    categoryEdit: (req, res) => {
        db.Category.findByPk(req.params.id).then((category) => {
            res.render('admin/categoryEditForm', {
                category,
                userInSession: req.session.userLogged ? req.session.userLogged : ''
            })
        })
    },
    categoryUpdate: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.Category.findByPk(req.params.id).then((category) => {
                db.Category.update({
                    name: req.body.name
                }, 
                {
                    where: {
                        id: req.params.id
                    }
                }).then((result) => {
                    res.redirect('/admin/categories')
                });
            });
        } else {
            db.Category.findByPk(req.params.id).then((category) => {
                res.render('/admin/categoryEditForm'), {
                    category,
                    errors: errors.mapped(),
                    old: req.body,
                    userInSession: req.session.userLogged ? req.session.userLogged : ''
                }
            });
        }
    },
    categoryDestroy: (req, res) => {
        db.ProductImage.destroy({
            where: {
                productId: req.params.id,
            }
        }).then((result) => {
            db.Product.destroy({
                where: {
                    categoryId: req.params.id,
                },                                
            }).then((result) => {
                db.Subcategory.destroy({
                    where: {
                        categoryId: req.params.id,
                    },
                })
                .then((result) => {
                    db.Category.findByPk(req.params.id).then((category) => {
                        db.Category.destroy({
                            where: {
                                id: req.params.id
                            }
                        }).then((result) => {
                            return res.redirect('/admin/categories')
                        });
                    })
                }).catch(err => console.log(err))
            })
        })
                
    }
}