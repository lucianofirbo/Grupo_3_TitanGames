const path = require('path');

module.exports = {
    add: (req, res) => {
        res.render('products/productAdd');
    },
    edit: (req, res) => {
        res.render('products/editProduct')
    }
}