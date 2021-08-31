const { read } = require('fs');
const path = require('path');
const { getProducts, saveProduct, saveDb } = require('../data/dataBase');

module.exports = {

    addRender: (req, res) => {

        res.render('products/productAdd', {dataBase: getProducts});

    },

    addProduct: (req, res) => {

        console.log(req.files)

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
            image: req.files['imagenProducto'] !== undefined ? '/games/' + req.files['imagenProducto'][0].filename : '/games/' + 'naraka.png',
            image2: req.files['imagenProducto2'] !== undefined ? '/games/' + req.files['imagenProducto2'][0].filename : '/games/' + 'naraka.png'
        }

        saveProduct(producto);
        res.redirect(`/product/detail/${producto.id}`);

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

        console.log(req.file[0])

        /* getProducts.forEach(element => {
            if (element.id === +req.params.id) {
                element.id = element.id,
                element.product = req.body.product,
                element.price = req.body.precio,
                element.description = req.body.descripcion,
                element.category = req.body.genero,
                element.subcategory = req.body.subGenero,
                element.image = req.file['imagenProducto1edit'][0] ? '/games/' + req.files['imagenProducto1edit'][0].filename : element.image,
                element.image2 = req.file['imagenProducto2edit'][0] ? '/games/' + req.files['imagenProducto1edit'][0].filename : element.image2
            }
        })

        saveDb(getProducts);

        res.redirect(`/product/detail/${req.params.id}`); */

    },

    deleteProduct: (req, res) => {

        getProducts.forEach(element => {
            if (element.id === +req.params.id) {
                let productRemove = getProducts.indexOf(element);
                getProducts.splice(productRemove, 1);
            }
        })        

        saveDb(getProducts);

        res.redirect('/admin/addProduct');

    }

}