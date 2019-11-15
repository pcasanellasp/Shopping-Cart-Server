// ------------------------------
// Provider Routes
// ------------------------------

const express = require('express')
const router = express.Router()
const providerController = require('../controllers/providerController')
// const { auth, allow } = require('../middlewares/auth')

// --------------------
router.get('/', providerController.get)
router.get('/:id', providerController.show)
router.post('/', providerController.create)
router.patch('/:id', providerController.update)
router.delete('/:id', providerController.remove)

module.exports = router
