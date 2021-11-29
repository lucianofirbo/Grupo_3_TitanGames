const db = require('../../database/models');

const getUrl = (req) => {
    return `${req.protocol}://${req.get('host')}${req.originalUrl}` 
}

module.exports = {
    list: (req, res) => {
        db.Category.findAll({
            include: [{association: 'products'}, {association: 'subCategory'}]
        })
        .then((categories) => {
            return res.json({
                meta: {
                    endpoint: getUrl(req),
                    status: 200,
                    total: categories.length
                },
                data: categories
            })
        }).catch(err => console.log(err))
    },
    detail: (req, res) => {
        db.Category.findOne({where: {id:req.params.id }, include: [{association: "subCategory"}]}).then(category => {
            res.status(200).json({
                meta:{
                    status: 200
                },
                data: category
            })
        })
    }     
}