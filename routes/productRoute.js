// ------------------------------
// Product Routes
// ------------------------------

const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
// const { auth, allow } = require('../middlewares/auth')

// --------------------
router.get('/', productController.get)
router.get('/:id', productController.show)
router.post('/', productController.create)
router.patch('/:id', productController.update)
router.delete('/:id', productController.remove)

module.exports = router
