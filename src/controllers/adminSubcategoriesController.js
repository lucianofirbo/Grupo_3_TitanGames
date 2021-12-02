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
        db.Category.findAll().then((category) => {
            res.render('admin/subcategoryForm', {
                category,
                old: req.body,
                userInSession: req.session.userLogged ? req.session.userLogged : ''
            });
        })
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
            db.Category.findAll().then((category) => {
                res.render('admin/subcategoryForm', {
                    category,
                    errors: errors.mapped(),
                    old: req.body,
                    userInSession: req.session.userLogged ? req.session.userLogged : ''
                });
            })
        }
    },
    subcategoryEdit: (req, res) => {
        db.Category.findAll().then((category) => {
            db.Subcategory.findByPk(req.params.id).then((subcategory) => {
                res.render('admin/subCategoryEditForm', {
                    subcategory,
                    category,
                    old: req.body,
                    userInSession: req.session.userLogged ? req.session.userLogged : ''
                })
            })
        })
    },
    subcategoryUpdate: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Subcategory.update(
                {
                    name: req.body.name,
                    categoryId: req.body.categoryId
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            ).then((result) => {
                res.redirect('/admin/subcategories')
            })
        } else {
            db.Category.findAll().then((category) => {
                db.Subcategory.findByPk(req.params.id).then((subcategory) => {
                    res.render('admin/subCategoryEditForm', {
                        category,
                        subcategory,
                        errors: errors.mapped(),
                        old: req.body,
                        userInSession: req.session.userLogged ? req.session.userLogged : ''
                    })
                })
            })
        }
    },
    subcategoryDestroy: (req, res) => {
        db.Product.findAll({
            where: {
                subCategoryId: req.params.id
            }
        }).then(products => {
            products.forEach(product => {
                db.ProductImage.findAll({
                    where: {
                        productId: product.id
                    }
                }).then(images => {
                    images.forEach((image) => {
                        fs.existsSync("./public/img/games/", image.image)
                        ? fs.unlinkSync("./public/img/games/" + image.image)
                        : console.log("--No se encontró");
                    });
                })
                db.ProductImage.destroy({
                    where: {
                        productId: product.id
                    }
                }).then((result) => {})
            })
            db.Product.destroy({
                where: {
                    subCategoryId: req.params.id
                }
            }).then((result) => {
                db.Subcategory.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then((result) => {
                    return res.redirect('/admin/subcategories')
                });
            });
        })
    }
}