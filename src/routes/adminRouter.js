const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const fileUpload = require('../middlewares/multerMiddleware');
const adminCheck = require('../middlewares/adminCheck');
const productValidator = require('../validations/productCreateValidator');
const productEditValidator = require('../validations/editProductValidator');
const {categories, categoryCreateForm, categoryStore, categoryEdit, categoryUpdate, categoryDestroy} = require('../controllers/adminCategoriesController')
const {subcategories, subcategoryCreateForm, subcategoryStore, subcategoryEdit, subcategoryUpdate, subcategoryDestroy} = require('../controllers/adminSubcategoriesController')

/* Main Admin */ 
router.get('/adminMain/:id', adminCheck, controller.adminMain);

/** ** **  PRODUCTS CRUD ** ** **/

/* Add Product */
router.get('/products', adminCheck, controller.addRender);
router.post('/products', fileUpload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenProducto2', maxCount: 1 },
    { name: 'imagenProducto3', maxCount: 1 },
    { name: 'imagenProducto4', maxCount: 1 },
    { name: 'imagenProducto5', maxCount: 1 }]), productValidator,controller.addProduct);
/* Edit Product*/
router.get('/editProduct/:id', adminCheck, controller.editRender);
router.put('/editProduct/:id', fileUpload.fields([
    { name: 'imagenProducto', maxCount: 1 },
    { name: 'imagenProducto2', maxCount: 1 },
    { name: 'imagenProducto3', maxCount: 1 },
    { name: 'imagenProducto4', maxCount: 1 },
    { name: 'imagenProducto5', maxCount: 1 }]), productEditValidator,controller.editProduct);
/* Delete Product */
router.delete('/deleteProduct/:id', controller.deleteProduct);

/** ** **  CATEGORIES CRUD ** ** **/

/* All categories */
router.get('/categories', adminCheck, categories);
/* Add categories */
router.get('/categories/create', adminCheck, categoryCreateForm);
router.post('/categories/create', adminCheck, categoryStore);
/* Edit category */
router.get('/categories/edit/:id', adminCheck, categoryEdit);
router.put('/categories/edit/:id', adminCheck, categoryUpdate);
/* Delete category */
router.delete('/categories/delete/:id', categoryDestroy);

/** ** **  SUBCATEGORIES CRUD ** ** **/

/* All subcategories */
router.get('/subcategories', adminCheck, subcategories);
/* Add subcategories */
router.get('/subcategories/create', adminCheck, subcategoryCreateForm);
router.post('/subcategories/create', adminCheck, subcategoryStore);

module.exports = router;