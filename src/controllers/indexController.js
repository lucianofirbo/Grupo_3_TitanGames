const path = require('path');
let {getProducts} = require('../data/dataBase');

module.exports = {

    index: (req, res) => {

        if (req.session.visits == undefined) {
            req.session.visits = 0
        }

        req.session.visits ++;

        console.log(req.session.visits)

        res.render('users/index', {dataBase: getProducts, userInSession : req.session.userLogged ? req.session.userLogged : ''});
    },
    politics: (req, res) => {
        res.render('users/privacyPolitics', {userInSession : req.session.userLogged ? req.session.userLogged : ''});
    },
    about: (req, res) => {
        res.render('users/aboutUs', {userInSession : req.session.userLogged ? req.session.userLogged : ''});
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
            search: req.query.keywords, 
            userInSession : req.session.userLogged ? req.session.userLogged : ''
        });
    }
    
}