const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');
const fileUpload = require('../middlewares/multerMiddleware');
const adminCheck = require('../middlewares/adminCheck');
const productValidator = require('../validations/productCreateValidator');
const productEditValidator = require('../validations/editProductValidator');
const {categories, categoryCreateForm, categoryStore, categoryEdit, categoryUpdate, categoryDestroy} = require('../controllers/adminCategoriesController');
const categoryValidator = require('../validations/categoriesAdminValidator');
const {subcategories, subcategoryCreateForm, subcategoryStore, subcategoryEdit, subcategoryUpdate, subcategoryDestroy} = require('../controllers/adminSubcategoriesController');
const subcategoryValidator = require('../validations/subcategoriesAdminValidator');

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

/* Ruta para administrar usuarios */
router.get('/adminUsers', adminCheck, controller.userAdminRender);
router.put('/userEdit/:id', adminCheck, controller.userAdminEdit);
router.delete('/deleteUserAdmin/:id', adminCheck, controller.deleteUserAdmin);

/* Ruta para buscar usuario como admin */
router.get('/adminSearchUser', adminCheck, controller.adminSearchUser);
/* Ruta para buscar productos como admin */
router.get('/adminSearchProduct', adminCheck, controller.adminSearchProduct);

/** ** **  CATEGORIES CRUD ** ** **/

/* All categories */
router.get('/categories', adminCheck, categories);
/* Add categories */
router.get('/categories/create', adminCheck, categoryCreateForm);
router.post('/categories/create',  categoryValidator, categoryStore);
/* Edit category */
router.get('/categories/edit/:id', adminCheck, categoryEdit);
router.put('/categories/edit/:id',  categoryValidator, categoryUpdate);
/* Delete category */
router.delete('/categories/delete/:id', categoryDestroy);

/** ** **  SUBCATEGORIES CRUD ** ** **/

/* All subcategories */
router.get('/subcategories', adminCheck, subcategories);
/* Add subcategories */
router.get('/subcategories/create', adminCheck, subcategoryCreateForm);
router.post('/subcategories/create', subcategoryValidator, subcategoryStore);
/* Edit subcategory */
router.get('/subcategories/edit/:id', adminCheck, subcategoryEdit);
router.put('/subcategories/edit/:id', subcategoryValidator, subcategoryUpdate);
/* Delete subcategory */
router.delete('/subcategories/delete/:id', subcategoryDestroy);

module.exports = router;