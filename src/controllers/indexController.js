const path = require('path');
let {getProducts} = require('../data/dataBase');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');

module.exports = {

    index: (req, res) => {        
        
        /* Como primer elemento traigo la subcategoria, despues la categoria y finalmente el producto */
        db.Subcategory.findAll({
            include : [{association: "category", include: [{ association: "products"}] }]
        })
        .then (subcategory => {
            res.send(subcategory[0].category.products)
            /* res.render('users/index', {dataBase: subcategory, userInSession : req.session.userLogged ? req.session.userLogged : ''}); */
        })
        
    },
    politics: (req, res) => {
        res.render('users/privacyPolitics', {
            userInSession : req.session.userLogged ? req.session.userLogged : ''
        });
    },
    about: (req, res) => {
        res.render('users/aboutUs', {
            userInSession : req.session.userLogged ? req.session.userLogged : ''
        });
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