const { read } = require('fs');
const path = require('path');
const { getProducts, saveProduct, saveDb } = require('../data/dataBase');

module.exports = {

    addRender: (req, res) => {

        res.render('products/productAdd', {dataBase: getProducts});

    },

    addProduct: (req, res) => {     

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

    editRender: (req, res) => {

        let productRequiredId = +req.params.id;

        let productRequiredFind = getProducts.find(element => {
            if (element.id === productRequiredId) {
                return element;
            }
        });

        res.render('products/editProduct', {product: productRequiredFind});

    },

    editProduct: (req, res) => {

        let editedProduct = getProducts.forEach(element => {
            if (element.id === +req.params.id) {
                element.id = element.id,
                element.product = req.body.product,
                element.price = req.body.precio,
                element.description = req.body.descripcion,
                element.category = req.body.genero,
                element.subcategory = req.body.subGenero,
                element.image = req.body.imagen ? req.body.imagen : 'naraka.png'
            }
        })

        saveDb(getProducts);

        res.redirect(`/product/detail/${req.params.id}`);

    },

    deleteProduct: (req, res) => {

        getProducts.forEach(element => {
            if (element.id === +req.params.id) {
                getProducts.splice(element, 1)
            }
        })

        saveDb(getProducts);

        res.redirect(`/admin/addProduct`);

    }

}