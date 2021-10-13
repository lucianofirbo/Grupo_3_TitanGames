const path = require('path');
const { getProducts } = require('../data/dataBase');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');

module.exports = {
//vista con una lista de todos los productos?
    index: (req, res) => {
        res.render('products/products', {
            products: getProducts,
            toThousand,
            userInSession : req.session.userLogged ? req.session.userLogged : ''
        })
    }, 

    detail: (req, res) => {
        db.Product.findAll({
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}]
        })
        .then(products => {
            db.Product.findOne({
                where: {
                    id: req.params.id
                },
                include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}]
            })
            .then(product => {
                res.render('products/productDetail', {
                    productF: product, 
                    dataBase: products,
                    toThousand,
                    userInSession : req.session.userLogged ? req.session.userLogged : ''
                });
            }
        )})
        
        /*let productR = +req.params.id;
        let productF = getProducts.find(element => {
            if (productR === element.id) {
                return element;
            }
        });
        res.render('products/productDetail', {
            productF, 
            dataBase: getProducts,
            toThousand,
            userInSession : req.session.userLogged ? req.session.userLogged : ''
        });*/
    },

    cart: (req, res) => {
        res.render('products/productCart', {
            dataBase: getProducts,
            toThousand,
            userInSession : req.session.userLogged ? req.session.userLogged : ''
        })
    }
}