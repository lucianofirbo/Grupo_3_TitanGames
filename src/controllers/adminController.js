const path = require('path');
const { getProducts, saveProduct } = require('../data/dataBase');

module.exports = {
    addRender: (req, res) => {
        res.render('products/productAdd');
    },
    add: (req, res) => {

        console.log(req.body)

        let lastIdDb = Object.keys(getProducts)[Object.keys(getProducts).length-1];
        
        let producto = {
            id: lastIdDb + 1,
            product: req.body.product,
            price: req.body.precio,
            description: req.body.descripcion,
            category: req.body.genero,
            subcategory: req.body.subgenero,
            image: req.body.imagen ? req.body.imagen : 'naraka.png'
        }

        if (saveProduct(producto)) {
            res.redirect(`http://localhost:3000/product/detail/${producto.id}`);
        } else {
            res.send('error')
        }

    },
    edit: (req, res) => {
        res.render('products/editProduct')
    }



}