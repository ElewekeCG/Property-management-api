const router = require('express').Router()

// Validations
const {registerValidation, loginValidation} = require('../validations/adminValidation')

// Middleware
const { verifyToken } = require('../middlewares/admin-auth.middleware')
const {validationMiddleware} = require ("../middlewares/validation.middleware")

// Controllers
const { signup, login, createUser, getAllUsers, deleteuser} = require('../controllers/admin.controller')

// Routes
router.post('/auth/admin/signup', validationMiddleware(registerValidation) , signup)
router.post('/auth/admin/login', validationMiddleware(loginValidation) , login)
router.post('/admin/user', validationMiddleware(registerValidation), verifyToken, createUser)
router.get('/admin/users', verifyToken, getAllUsers)
router.delete('/admin/delete/:userId', verifyToken, deleteuser)
// router.delete('/admin/delete', verifyToken, deleteUser )
// router.get('/admin/hospitals/list', verifyToken, getAllHospitals)
// router.get('/admin/reports/list', verifyToken, getAllReports)
// router.post('/admin/hospital/deactivate', validationMiddleware(v_deactivateHospital) ,verifyToken, deactivateHospitalAccount)
// router.post('/admin/hospital/activate', validationMiddleware(v_deactivateHospital),verifyToken, activateHospital)

module.exports = router;