const db = require('../../database/models');

const getUrl = (req) => {
    return `${req.protocol}://${req.get("host")}${req.originalUrl}`
}

module.exports = {
    list: (req, res) => {
        db.User.findAll({
            include: [{association: "address"}]
        }).then((users) => {
            return res.json({
                meta: {
                    endpoint: getUrl(req),
                    status: 200,
                    total: users.length
                },
                data: users
            }).catch(err => console.log(err))
        });
    },
    detail: (req, res) => {
        db.User.findByPk(req.params.id, {include: [{association: "address"}]})
        .then(user => {
            return res.status(200).json({
                meta: {
                    endpoint: getUrl(req),
                    status: 200
                },
                data: user
            }).catch(err => console.log(err))
        });
    }
}