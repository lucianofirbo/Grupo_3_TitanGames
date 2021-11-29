const db = require('../../database/models');

const getUrl = (req) => {
    return `${req.protocol}://${req.get("host")}${req.originalUrl}`
}

module.exports = {
    list: (req, res) => {
        db.Product.findAll({
            include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}]
        }).then((products) => {
            return res.json({
                meta: {
                    endpoint: getUrl(req),
                    status: 200,
                    total: products.length
                },
                data: products
            }).catch(err => console.log(err));
        });
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {include: [{association: "categories"}, {association: "subcategory"}, {association: "productImage"}]})
        .then(product => {
            return res.status(200).json({
                meta: {
                    endpoint: getUrl(req),
                    status: 200
                },
                data: product
            }).catch(err => console.log(err));
        });
    },
    create: (req, res) => {
        const { product, 
                price, 
                description, 
                offers, 
                minimumVideo, 
                minimumProcessor, 
                minimumRam, 
                recommendedVideo, 
                recommendedProcessor, 
                recommendedRam, 
                videoURL, 
                timesVisited } = req.body
        
        db.Product.create({
                product, 
                price, 
                description, 
                offers, 
                minimumVideo, 
                minimumProcessor, 
                minimumRam, 
                recommendedVideo, 
                recommendedProcessor, 
                recommendedRam, 
                videoURL, 
                timesVisited
        })
        .then((product) => {
            res.status(201).json({
                meta: {
                    msg: 'Product added successfully'
                },
                data: product
            })
        }).catch(err => console.log(err));
    }
}