const path = require('path');
let {getProducts} = require('../data/dataBase');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');

module.exports = {

    index: (req, res) => {

        /* db.Product.findAll({
            include: {
              model: Category,
              include: Subcategory
            }
          })
        .then(result => {
            console.log(result[0].Category)
        }) */
        
        db.Product.findAll({
            include: [{ association: "categories" }]
        })
        .then(products => {
            db.Category.findAll({
                include: [{association: "subcategories"}]
            })
            .then(elements => {
                console.log(elements)
            }) 
        })

        res.render('users/index', {dataBase: getProducts, userInSession : req.session.userLogged ? req.session.userLogged : ''});
        
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