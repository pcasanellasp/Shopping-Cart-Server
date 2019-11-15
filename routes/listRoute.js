// ------------------------------
// Provider Routes
// ------------------------------

const express = require('express')
const router = express.Router()
const listController = require('../controllers/listController')
// const { auth, allow } = require('../middlewares/auth')

// --------------------
router.get('/', listController.get)
router.get('/:id', listController.show)
router.post('/', listController.create)
router.patch('/:id', listController.update)
router.delete('/:id', listController.remove)

module.exports = router
