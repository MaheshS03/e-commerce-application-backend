const express = require('express')
const adminRouter = express.Router()

const {getAllProducts, addNewProduct, updateProduct, deleteProduct} = require('../controllers/productController')
const {getAllCategories, addNewCategory, updateCategory, deleteCategory} = require('../controllers/categoryController')
const {getAllSubCategories, addNewSubCategory, updateSubCategory, deleteSubCategory} = require('../controllers/subCategoryController')

const validate = require('../middleware/validate')
const {verify, verifyAdmin} = require('../middleware/verify')
const {login, logout} = require('../controllers/authController')
const {check} = require('express-validator')
const {authenticateAdmin} = require('../controllers/adminController')

adminRouter.post(
    '/login',
    check('email')
        .isEmail()
        .withMessage('Enter a valid email address')
        .normalizeEmail(),
    check('password').not().isEmpty(),
    validate,
    login
)

adminRouter.get('/authenticate', verify, verifyAdmin, authenticateAdmin)

adminRouter.get('/logout', verify, logout)

adminRouter.get('/products/get', getAllProducts)

adminRouter.post('/products/add', addNewProduct)

adminRouter.patch('/products/update', updateProduct)

adminRouter.delete('/products/delete', deleteProduct)

adminRouter.get('/category/get', getAllCategories)

adminRouter.post('/category/add', addNewCategory)

adminRouter.patch('/category/update', updateCategory)

adminRouter.delete('/category/delete', deleteCategory)

adminRouter.get('/subcategory/get', getAllSubCategories)

adminRouter.post('/subcategory/add', addNewSubCategory)

adminRouter.patch('/subcategory/update', updateSubCategory)

adminRouter.delete('/subcategory/delete', deleteSubCategory)

module.exports = adminRouter