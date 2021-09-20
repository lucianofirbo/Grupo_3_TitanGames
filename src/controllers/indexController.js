const path = require('path');
let {getProducts} = require('../data/dataBase');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {

    index: (req, res) => {
        
        res.render('users/index', {dataBase: getProducts});
    },
    politics: (req, res) => {
        res.render('users/privacyPolitics');
    },
    about: (req, res) => {
        res.render('users/aboutUs');
    },
    search: (req, res) => {
        let result = [];
        getProducts.forEach(product => {
            if (product.product.toLowerCase().includes(req.query.keywords.toLowerCase())) {
                result.push(product)
            }
        });
        res.render('users/search', {
            result,
            search: req.query.keywords
        });
    },
    
}