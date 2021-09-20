const path = require('path');
const { getProducts } = require('../data/dataBase');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
//vista con una lista de todos los productos?
    index: (req, res) => {
        res.render('products/products', {
            products: getProducts,
            toThousand
        })
    }, 

    detail: (req, res) => {

        let productR = +req.params.id;

        let productF = getProducts.find(element => {
            if (productR === element.id) {
                return element;
            }
        });

        res.render('products/productDetail', {
            productF, 
            dataBase: getProducts,
            toThousand
        });

    },

    cart: (req, res) => {
        res.render('products/productCart', {
            dataBase: getProducts,
            toThousand
        })
    }
}