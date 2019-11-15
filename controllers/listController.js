// ------------------------------
// List Controller
// ------------------------------

const List = require('../models/List')

async function get (req, res, next) {
  try {
    const lists = await List.search(req.query)
    return res.status(200).json(lists)
  } catch (error) {
    next(error)
  }
}

async function show (req, res, next) {
  try {
    const list = await List.findOne({ _id: req.params.id }).lean()
    if (list) {
      return res.status(200).json(list)
    }
    return res.status(400).json({ message: 'No List Found' })
  } catch (error) {
    next(error)
  }
}

async function create (req, res, next) {
  // Create a new list
  try {
    const list = new List(req.body)
    await list.save()
    res.status(201).json(list)
  } catch (error) {
    next(error)
  }
}

async function update (req, res, next) {
  try {
    const list = await List.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    )
    return res.status(200).json(list)
  } catch (error) {
    error.statusCode = 403
    next(error)
  }
}

async function remove (req, res, next) {
  // Remove list
  try {
    const list = await List.findByIdAndRemove(req.params.id)
    res.status(202).json(list)
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
