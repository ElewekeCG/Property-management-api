const router = require("express").Router()

//validations
const {loginValidation, addProperty, searchProperty, createTransaction, createTenants, searchTenants, createExpenses} = require('../validations/userValidation')

//middleware
const {validationMiddleware} = require ("../middlewares/validation.middleware")
const { verifyToken } = require("../middlewares/auth.middleware")

//controllers
const {login, addProp, getAllprops, search, addTransaction, createTenant, findTenant, newExpenses, getExpenses } = require("../controllers/user.controller")

//routes
router.post('/auth/login', validationMiddleware(loginValidation), login)
router.post('/user/property', verifyToken, validationMiddleware(addProperty), addProp )
router.get('/user/viewproperties', verifyToken, getAllprops)
router.get('/user/search', verifyToken, validationMiddleware(searchProperty), search)
router.post('/user/addtransaction', verifyToken, validationMiddleware(createTransaction), addTransaction)
router.post("/user/tenant", verifyToken, validationMiddleware(createTenants), createTenant )
router.get('/user/findTenant', verifyToken, validationMiddleware(searchTenants), findTenant)
router.post("/user/expenses", verifyToken, validationMiddleware(createExpenses), newExpenses )
router.get('/user/getExpenses/', verifyToken, getExpenses)

module.exports = router 