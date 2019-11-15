// ------------------------------
// Provider Controller
// ------------------------------

const Provider = require('../models/Provider')

async function get (req, res, next) {
  try {
    const providers = await Provider.search(req.query)
    return res.status(200).json(providers)
  } catch (error) {
    next(error)
  }
}

async function show (req, res, next) {
  try {
    const provider = await Provider.findOne({ _id: req.params.id }).lean()
    if (provider) {
      return res.status(200).json(provider)
    }
    return res.status(400).json({ message: 'No Provider Found' })
  } catch (error) {
    next(error)
  }
}

async function create (req, res, next) {
  // Create a new provider
  try {
    const provider = new Provider(req.body)
    await provider.save()
    res.status(201).json(provider)
  } catch (error) {
    next(error)
  }
}

async function update (req, res, next) {
  try {
    const provider = await Provider.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    )
    return res.status(200).json(provider)
  } catch (error) {
    error.statusCode = 403
    next(error)
  }
}

async function remove (req, res, next) {
  // Remove provider
  try {
    const provider = await Provider.findByIdAndRemove(req.params.id)
    res.status(202).json(provider)
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
