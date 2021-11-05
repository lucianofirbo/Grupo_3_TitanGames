const { validationResult } = require('express-validator');
const db = require('../database/models');

module.exports = {

    adminMain: (req, res) => {
        db.User.findByPk(req.session.userLogged.id)
        .then(user => {
            res.render('users/admin', {admin: user, userInSession : req.session.userLogged ? req.session.userLogged : ''})
        })
    },

    addRender: (req, res) => {
        db.Product.findAll({
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}]
        })
        .then(product => {
            db.Category.findAll()
            .then(category => { 
                db.Subcategory.findAll()
                .then(subcategory => {
                    /* res.send(product[0].productImage) */
                    res.render('products/productAdd', {dataBase: product, category, subcategory, userInSession : req.session.userLogged ? req.session.userLogged : ''});
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
            })
        } else {
            res.redirect('/admin/products')
        }
    },

    editRender: (req, res) => {
        db.Product.findOne({
            where: {
                id: req.params.id
            },
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}]
        })
        .then(product => {
            db.Category.findAll()
            .then(category => { 
                db.Subcategory.findAll()
                .then(subcategory => {
                    res.render('products/editProduct', {product, category, subcategory, userInSession : req.session.userLogged ? req.session.userLogged : ''});
                })  
            })
        })
    },

    editProduct: (req, res) => {
        console.log(req.body)
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
                    /* No tengo ni idea como hacer para que elimine solo las imagenes que eligen reemplazar */
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
                include: [/* {association: 'categories'}, {association: 'subcategory'},  */{association: 'productImage'}]
            })
            .then(() => {
                res.redirect('/')
            })
        })
    },
    
}