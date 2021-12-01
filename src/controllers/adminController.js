const { validationResult } = require('express-validator');
const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    adminMain: (req, res) => {
        db.Category.findAll().then((genres) => {
            db.Product.findAll().then((product) => {
                db.User.findAll()
                    .then(user => {
                        res.render('users/admin', { 
                            admin: user ,
                            product,
                            genres,
                            userInSession: req.session.userLogged ? req.session.userLogged : '' 
                        })
                    })           
            })
        })        
    },

    addRender: (req, res) => {
        db.Product.findAll({
            include: [{ association: "categories" }, { association: "subcategory" }, { association: "productImage" }]
        })
            .then(product => {
                db.Category.findAll()
                    .then(category => {
                        db.Subcategory.findAll()
                            .then(subcategory => {
                                res.render('products/productAdd', { dataBase: product, category, subcategory, userInSession: req.session.userLogged ? req.session.userLogged : '' });
                        })
                    })
            })
    },

    addProduct: (req, res) => {
        let errors = validationResult(req);
        if (req.fileValidatorError) {
            let image = {
                param: "image",
                msg: req.fileValidatorError,
            };
            errors.push(image);
        }
        if (errors.isEmpty()) {
            let arrayImages = [];
            if (req.files) {
                for (const clave in req.files) {
                    array = req.files[clave]
                    arrayImages.push(`${array[0].filename}`);
                }
            }
            db.Product.create({
                product: req.body.product,
                price: req.body.precio,
                description: req.body.descripcion,
                offers: req.body.offers,
                categoryId: req.body.genero,
                subCategoryId: req.body.subGenero,
                minimumVideo: req.body.minimumVideo,
                minimumProcessor: req.body.minimumProcessor,
                minimumRam: req.body.minimumRam,
                recommendedVideo: req.body.recommendedVideo,
                recommendedProcessor: req.body.recommendedProcessor,
                recommendedRam: req.body.recommendedRam,
                videoURL: req.body.videoURL ? req.body.videoURL : 'https://youtu.be/dQw4w9WgXcQ',
                timesVisited: 0
            })
            .then(product => {
                if(arrayImages.length > 0){
                    let images = arrayImages.map(image => {
                        return {
                            image: image,
                            productId: product.id
                        }
                    })
                    db.ProductImage.bulkCreate(images)
                        .then(() => res.redirect('/admin/products'))
                        .catch(err => console.log(err))
                }
            });
        } else {
            db.Product.findAll({
                include: [{ association: "categories" }, { association: "subcategory" }, { association: "productImage" }]
            })
            .then(product => {
                db.Category.findAll()
                    .then(category => {
                        db.Subcategory.findAll()
                            .then(subcategory => {
                                /* res.send(product[0].productImage) */
                                res.render('products/productAdd', { 
                                    dataBase: product, category, subcategory, 
                                    errors: errors.mapped(),
                                    userInSession: req.session.userLogged ? req.session.userLogged : '' });
                            })
                    })
            })
        }
    },

    editRender: (req, res) => {
        db.Product.findOne({
            where: {
                id: req.params.id
            },
            include: [{ association: "categories" }, { association: "subcategory" }, { association: "productImage" }]
        })
        .then(product => {
            db.Category.findAll()
                .then(category => {
                    db.Subcategory.findAll()
                        .then(subcategory => {
                            res.render('products/editProduct', { product, category, subcategory, userInSession: req.session.userLogged ? req.session.userLogged : '' });
                        })
                })
        })
    },

    editProduct: (req, res) => {
        let errors = validationResult(req);
        if (req.fileValidatorError) {
            let image = {
                param: "image",
                msg: req.fileValidatorError,
            };
            errors.push(image);
        }
        let arrayImages = [];
        if (req.files) {
            console.log(req.files)
            for (clave in req.files) {
                array = req.files[clave]
                arrayImages.push(`${array[0].filename}`);
            }
        }
        if (errors.isEmpty()) {
            db.Product.update({
                product: req.body.product,
                price: req.body.precio,
                description: req.body.descripcion,
                offers: req.body.offers,
                categoryId: req.body.genero,
                subCategoryId: req.body.subGenero,
                minimumVideo: req.body.minimumVideo,
                minimumProcessor: req.body.minimumProcessor,
                minimumRam: req.body.minimumRam,
                recommendedVideo: req.body.recommendedVideo,
                recommendedProcessor: req.body.recommendedProcessor,
                recommendedRam: req.body.recommendedRam,
                videoURL: req.body.videoURL ? req.body.videoURL : 'https://youtu.be/dQw4w9WgXcQ'
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                if (arrayImages.length > 0) {
                    db.ProductImage.findOne({
                        where: {
                            image: req.body.imageOldName0
                        }
                    })
                    .then(image => {
                        db.ProductImage.destroy({
                            where: {
                                id: image.id
                            }
                        })
                        let images = arrayImages.map(image => {
                            return {
                                image: image,
                                productId: req.params.id
                            }
                        })
                        db.ProductImage.bulkCreate(images)
                            .then(() => res.redirect('/admin/products'))
                    })
                }
                res.redirect('/admin/products')
            })
        } else {
            db.Product.findOne({
                where: {
                    id: req.params.id
                },
                include: [{ association: "categories" }, { association: "subcategory" }, { association: "productImage" }]
            })
            .then(product => {
                db.Category.findAll()
                    .then(category => {
                        db.Subcategory.findAll()
                            .then(subcategory => {
                                res.render('products/editProduct', { 
                                    product, category, subcategory, 
                                    errors: errors.mapped(),
                                    userInSession: req.session.userLogged ? req.session.userLogged : '' });
                            })
                    })
            })
        }
    },

    deleteProduct: (req, res) => {
        db.ProductImage.destroy({
            where: {
                productId: req.params.id
            }
        })
            .then(() => {
                db.Product.destroy({
                    where: {
                        id: req.params.id
                    },
                    include: [{ association: 'productImage' }]
                })
                    .then(() => {
                        res.redirect('/admin/products')
                    })
            })
    },

    userAdminRender: (req, res) => {
        db.User.findAll()
        .then(users => {
            res.render('users/userAdmin', { 
                users,
                userInSession: req.session.userLogged ? req.session.userLogged : '' });
        })
    },

    userAdminEdit:(req, res) => {
        console.log(req.body.selectRol)
        db.User.update({
            rol: req.body.selectRol
        },{
            where: {
                id: req.params.id
            }
        })
        .then(() => {            
            res.redirect('/admin/adminUsers')
        })
    },

    adminSearchUser: (req, res) => {
        db.User.findAll({
            where: {
                userName: {[Op.like]: `%${req.query.keywords}%`}
            }
        })
        .then(users => {
            res.render('users/userAdmin', {
                users,
                search: req.query.keywords,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            });
        })
    },

    adminSearchProduct: (req, res) => {
        db.Product.findAll({
            where: {
                product: {[Op.like]: `%${req.query.keywords}%`}
            },
            include: [{ association: "categories" }, { association: "subcategory" }, { association: "productImage" }]
        })
        .then(product => {
            db.Category.findAll()
                .then(category => {
                    db.Subcategory.findAll()
                        .then(subcategory => {
                            res.render('products/productAdd', { dataBase: product, category, subcategory, userInSession: req.session.userLogged ? req.session.userLogged : '' });
                        })
                })
        })
    },

    deleteUserAdmin: (req, res) => {
        db.Cart.destroy({
            where: {
                userId: req.params.id
            }
        })
        .then(() => {
            db.Address.destroy({
                where: {
                    userId: req.params.id
                }
            })
            .then(() => {
                db.User.destroy({
                    where: {
                        id: req.params.id
                    },
                    include: [{association: 'address'}]
                })
                .then(() => {
                    res.redirect('/admin/adminUsers')
                }) 
            })
        })
    }

}