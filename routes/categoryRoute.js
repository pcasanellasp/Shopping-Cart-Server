// ------------------------------
// Category Routes
// ------------------------------

const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
// const { auth, allow } = require('../middlewares/auth')

// --------------------
router.get('/', categoryController.get)
router.get('/:id', categoryController.show)
router.post('/', categoryController.create)
router.patch('/:id', categoryController.update)
router.delete('/:id', categoryController.remove)

module.exports = router
