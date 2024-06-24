const express = require('express')
const userRouter = express.Router()

const {getAllProducts} = require('../controllers/productController')
const {authenticateUser, searchByProductName, searchByCategory, searchBySubCategory} = require('../controllers/userController')
const validate = require('../middleware/validate')
const {verify} = require('../middleware/verify')
const {login, logout} = require('../controllers/authController')
const {check} = require('express-validator')
const placeOrder = require('../controllers/orderController')

userRouter.post(
    '/login',
    check('email')
        .isEmail()
        .withMessage('Enter a valid email address')
        .normalizeEmail(),
    check('password').not().isEmpty(),
    validate,
    login
)

userRouter.get('/authenticate', verify, authenticateUser)

userRouter.get('/logout', verify, logout)

userRouter.get('/', getAllProducts)

userRouter.get('/products/search/:name', searchByProductName)

userRouter.get('/category/search/:name', searchByCategory)

userRouter.get('/subcategory/search/:name', searchBySubCategory)

userRouter.post('/products/order', placeOrder)

module.exports = userRouter