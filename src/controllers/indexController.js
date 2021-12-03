const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    index: (req, res) => {       
        let product = db.Product.findAll({       
            order: [['timesVisited', 'DESC']],
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}],    
        })
        let lastGames = db.Product.findAll({
            order: [['id', 'DESC']],
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}]
        })
        let productSale = db.Product.findAll({
            where: {
                offers: {
                    [Op.gte]: 30
                }
            },
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}]
        })
        Promise.all([product, lastGames, productSale])
        .then(function([product, lastGames, productSale]) {
            res.render('users/index', {product, lastGames, productSale, userInSession : req.session.userLogged ? req.session.userLogged : ''});
        })        
    },
    politics: (req, res) => {
        res.render('users/privacyPolitics', {
            userInSession : req.session.userLogged ? req.session.userLogged : ''
        });
    },
    about: (req, res) => {
        db.Product.findAll({
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}],
        }).then((product) => {
            res.render('users/aboutUs', {
                product,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            });
        })
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
    },

    productOffer: (req, res) => {
        db.Product.findAll({
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}],
            where: {
                offers: {[Op.gt]: 0}
            }
        })
        .then(result => {
            res.render('products/productOffer', {
                result,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            });
        })
    },

    bestSellers: (req, res) => {
        db.Product.findAll({
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}],
            where: {
                timesVisited: {[Op.gt]: 0}
            }
        })
        .then(result => {
            res.render('products/bestSellers', {
                result,
                userInSession : req.session.userLogged ? req.session.userLogged : ''
            });
        })
    }


}