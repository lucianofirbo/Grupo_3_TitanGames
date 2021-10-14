const { getProducts, saveDb } = require('../data/dataBase');
const { validationResult } = require('express-validator');
const fs = require('fs').promises
const db = require('../database/models');

module.exports = {

    adminMain: (req, res) => {
        db.User.findByPk(req.session.userLogged.id)
        .then(user => {
            res.render('users/admin', {admin: user, userInSession : req.session.userLogged ? req.session.userLogged : ''})
        })

        /*let admin = getUsers.filter(user => {
            if (user.category == 'admin') {
                return user;
            }
        })
        res.render('users/admin', {admin, userInSession : req.session.userLogged ? req.session.userLogged : ''})*/
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
                /* offers: req.body.offers, */
                categoryId: req.body.genero,
                subCategoryId: req.body.subGenero,
                minimumVideo: req.body.minimumVideo,
                minimumProcessor: req.body.minimumProcessor,
                minimumRam: req.body.minimumRam,
                recommendedVideo: req.body.recommendedVideo,
                recommendedProcessor: req.body.recommendedProcessor,
                recommendedRam: req.body.recommendedRam,
                videoURL: req.body.videoURL ? req.body.videoURL : 'https://youtu.be/dQw4w9WgXcQ'
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
            console.log(errors)
        }
    },

        /*let errors = validationResult(req)
        if (errors.isEmpty()) {
            let lastId = 1;
            getProducts.forEach(element => {
                if (element.id > lastId) {
                    lastId = element.id;
                };
            })
            let producto = {
                id: lastId + 1,
                product: req.body.product,
                price: req.body.precio,
                description: req.body.descripcion,
                category: req.body.genero,
                subcategory: req.body.subGenero,
                minimumVideo: req.body.minimumVideo,
                minimumProcessor: req.body.minimumProcessor,
                minimumRam: req.body.minimumRam,
                recommendedVideo: req.body.recommendedVideo,
                recommendedProcessor: req.body.recommendedProcessor,
                recommendedRam: req.body.recommendedRam,
                videoURL: req.body.videoURL ? req.body.videoURL : 'https://youtu.be/dQw4w9WgXcQ',
                image: req.files['imagenProducto'] ? '/games/' + req.files['imagenProducto'][0].filename : '/games/' + 'notFound.png',
                image2: req.files['imagenProducto2'] ? '/games/' + req.files['imagenProducto2'][0].filename : '/games/' + 'notFound.png',
                image3: req.files['imagenProducto3'] ? '/games/' + req.files['imagenProducto3'][0].filename : '/games/' + 'notFound.png',
                image4: req.files['imagenProducto4'] ? '/games/' + req.files['imagenProducto4'][0].filename : '/games/' + 'notFound.png',
                image5: req.files['imagenProducto5'] ? '/games/' + req.files['imagenProducto5'][0].filename : '/games/' + 'notFound.png'
            }
            getProducts.push(producto);
            saveDb(getProducts);            
            res.redirect(`/product/detail/${producto.id}`, {
                userInSession : req.session.userLogged ? req.session.userLogged : '',
                dataBase: getProducts
            });
        } else {
            res.render('products/productAdd', {
                userInSession : req.session.userLogged ? req.session.userLogged : '',
                dataBase: getProducts,
                errors: errors.mapped(),
                old: req.body
            })
        }*/

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

        /* let productRequiredId = +req.params.id;
        let productRequiredFind = getProducts.find(element => {
            if (element.id === productRequiredId) {
                return element;
            }
        });
        res.render('products/editProduct', {product: productRequiredFind, userInSession : req.session.userLogged ? req.session.userLogged : ''});*/
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
            for (const clave in req.files) {
                array = req.files[clave]
                arrayImages.push(`${array[0].filename}`);
            }
        } 
        if (errors.isEmpty()) {
            db.Product.update({
                product: req.body.product,
                price: req.body.precio,
                description: req.body.descripcion,
                /* offers: req.body.offers, */
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
                    db.ProductImage.findAll({
                        where: {
                            productId: req.params.id
                        }
                    })
                    .then(image => {
                        image.forEach(image => {
                            db.ProductImage.destroy({
                                where: {
                                    image: image.image
                                }
                            })
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
            })
        }
    },

        /* getProducts.forEach(element => {
            if (element.id === +req.params.id) {
                element.id = element.id,
                element.product = req.body.product ? req.body.product : element.product,
                element.price = req.body.precio ? req.body.precio : element.price,
                element.description = req.body.descripcion ? req.body.descripcion : element.description,
                element.category = req.body.genero ? req.body.genero : element.category,
                element.subcategory = req.body.subGenero ? req.body.subGenero : element.subcategory,
                element.minimumVideo = req.body.minimumVideo ? req.body.minimumVideo : element.minimumVideo,
                element.minimumProcessor = req.body.minimumProcessor ? req.body.minimumProcessor : element.minimumProcessor,
                element.minimumRam = req.body.minimumRam ? req.body.minimumRam : element.minimumRam,
                element.recommendedVideo = req.body.recommendedVideo ? req.body.recommendedVideo : element.recommendedVideo,
                element.recommendedProcessor = req.body.recommendedProcessor ? req.body.recommendedProcessor : element.recommendedProcessor,
                element.recommendedRam = req.body.recommendedRam ? req.body.recommendedRam : element.recommendedRam,
                element.videoURL = req.body.videoURL ? req.body.videoURL : element.videoURL,
                element.image = req.files['imagenProducto'] ? '/games/' + req.files['imagenProducto'][0].filename : element.image,
                element.image2 = req.files['imagenProducto2'] ? '/games/' + req.files['imagenProducto2'][0].filename : element.image2,
                element.image3 = req.files['imagenProducto3'] ? '/games/' + req.files['imagenProducto3'][0].filename : element.image3,
                element.image4 = req.files['imagenProducto4'] ? '/games/' + req.files['imagenProducto4'][0].filename : element.image4,
                element.image5 = req.files['imagenProducto5'] ? '/games/' + req.files['imagenProducto5'][0].filename : element.image5
            }
        })
        saveDb(getProducts);
        res.redirect(`/product/detail/${req.params.id}`); */

    deleteProduct: (req, res) => {

        getProducts.forEach(element => {
            if (element.id === +req.params.id) {
                let productRemove = getProducts.indexOf(element);
                getProducts.splice(productRemove, 1);
            }
        })

        saveDb(getProducts);

        res.redirect('/admin/products');

    },

    
}