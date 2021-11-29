const { validationResult } = require('express-validator');
const db = require('../database/models');

module.exports = {
    subcategories: (req, res) => {
        db.Subcategory.findAll().then((subcategories) => {
            res.render('admin/subCategory', {
                subcategories,
                userInSession: req.session.userLogged ? req.session.userLogged : ''
            }); 
        });
    },
    subcategoryCreateForm: (req, res) => {
        res.render('admin/subcategoryForm', {
            userInSession: req.session.userLogged ? req.session.userLogged : ''
        });
    },
    subcategoryStore: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Subcategory.create({
                name: req.body.name,
                categoryId: req.body.category,
            }).then((result) => {
                res.redirect('/admin/subcategories');
            }).catch(err => console.log(err))
        } else {
            res.render('admin/subcategoryForm', {
                errors: errors.mapped(),
                old: req.body,
                userInSession: req.session.userLogged ? req.session.userLogged : ''
            });
        }
    }
}