const path = require('path');
const { getProducts, saveProduct } = require('../data/dataBase');

module.exports = {
    addRender: (req, res) => {
        res.render('products/productAdd', {dataBase: getProducts});
    },
    add: (req, res) => {

        let lastId = 1;
        getProducts.forEach(element => {
            if (element.id > lastId) {
                lastId = element.id;
            };
        })

        let producto = {
            id: lastId + 1,
            product: req.body.product,
            price: req.body.precio,
            description: req.body.descripcion,
            category: req.body.genero,
            subcategory: req.body.subGenero,
            image: req.body.imagen ? req.body.imagen : 'naraka.png'
        }

        if (saveProduct(producto)) {
            res.redirect(`/product/detail/${producto.id}`);
        } else {
            res.send('error');
        }

    },
    edit: (req, res) => {
        res.render('products/editProduct');
    }



}