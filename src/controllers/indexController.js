const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    index: (req, res) => {       
        db.Product.findAll({       
            order: [['timesVisited', 'DESC']],
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}],    
        })
        .then(product => {
            /* res.send(product) */
            res.render('users/index', {product, userInSession : req.session.userLogged ? req.session.userLogged : ''});
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
        db.Product.findAll({
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}],
            where:{
                product: {[Op.like]: `%${req.query.keywords}%`}
            }
        })
        .then(result => {
            res.render('users/search', {
                result,
                search: req.query.keywords,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            });
        })
    },
    searchPrice: (req, res) => {
        db.Product.findAll({
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}],
            where: {
                price: {[Op.lte]: req.params.price}
            }
        })
        .then(result => {
            res.render('users/search', {
                result,
                search: 'Hasta $' + req.params.price,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            });
        })
    }

}