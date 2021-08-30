const path = require('path');
let {getProducts} = require('../data/dataBase');

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
        res.render('users/search');
    }
    
}