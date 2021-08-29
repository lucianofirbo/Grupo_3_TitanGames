const path = require('path');
const { getProducts } = require('../data/dataBase');

module.exports = {
//vista con una lista de todos los productos?
    /* indexProduct: (req, res) => {
        res.render('')
    }, */
    detail: (req, res) => {

        let productR = +req.params.id;

        let productF = getProducts.find(element => {
            if (productR === element.id) {
                return element;
            }
        });

        res.render('products/productDetail', {productF});

    },

    cart: (req, res) => {
        res.render('products/productCart')
    }
}