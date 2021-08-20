const path = require('path');

module.exports = {
//vista con una lista de todos los productos?
    /* indexProduct: (req, res) => {
        res.render('')
    }, */
    detail: (req, res) => {
        res.render('products/productDetail')
    },
    cart: (req, res) => {
        res.render('products/productCart')
    }
}