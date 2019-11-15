// ------------------------------
// Category Controller
// ------------------------------

const Category = require('../models/Category')

async function get (req, res, next) {
  try {
    const categories = await Category.search(req.query)
    return res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}

async function show (req, res, next) {
  try {
    const category = await Category.findOne({ _id: req.params.id }).lean()
    if (category) {
      return res.status(200).json(category)
    }
    return res.status(400).json({ message: 'No Category Found' })
  } catch (error) {
    next(error)
  }
}

async function create (req, res, next) {
  // Create a new category
  try {
    const category = new Category(req.body)
    await category.save()
    res.status(201).json(category)
  } catch (error) {
    next(error)
  }
}

async function update (req, res, next) {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    )
    return res.status(200).json(category)
  } catch (error) {
    error.statusCode = 403
    next(error)
  }
}

async function remove (req, res, next) {
  // Remove category
  try {
    const category = await Category.findByIdAndRemove(req.params.id)
    res.status(202).json(category)
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
