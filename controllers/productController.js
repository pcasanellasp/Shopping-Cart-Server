// ------------------------------
// Product Controller
// ------------------------------

const Product = require('../models/Product')

async function get (req, res, next) {
  try {
    const products = await Product.search(req.query)
    return res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

async function show (req, res, next) {
  try {
    const product = await Product.findOne({ _id: req.params.id }).lean()
    if (product) {
      return res.status(200).json(product)
    }
    return res.status(400).json({ message: 'No Product Found' })
  } catch (error) {
    next(error)
  }
}

async function create (req, res, next) {
  // Create a new product
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
}

async function update (req, res, next) {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    )
    return res.status(200).json(product)
  } catch (error) {
    error.statusCode = 403
    next(error)
  }
}

async function remove (req, res, next) {
  // Remove product
  try {
    const product = await Product.findByIdAndRemove(req.params.id)
    res.status(202).json(product)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  get,
  show,
  create,
  update,
  remove,
}
