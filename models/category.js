// ------------------------------
// Category Model
// ------------------------------

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    default: '#fff',
    trim: true,
  },
},
{
  timestamps: true,
  toJSON: { virtuals: true },
})

CategorySchema.pre('save', async function (next) {
  // const category = this
  next()
})

// Custom Methods
CategorySchema.statics.search = async function search (params, cb) {
  const limit = params.limit ? parseInt(params.limit) : 10
  const page = params.page ? parseInt(params.page) : 1
  const sort = params.sort ? params.sort : 'createdAt'
  const order = params.order && params.order === 'ASC' ? '+' : '-'
  const items = params.items ? params.items.replace(/,/g, ' ') : ''

  const SearchParams = {}

  if (params.name) {
    SearchParams.name = new RegExp(params.name, 'i')
  }

  const [docs, totalDocs] = await Promise.all([
    Category
      .find(SearchParams, items)
      .sort(order + sort)
      .limit(limit)
      .skip((limit * page) - limit)
      .lean(),
    Category.find(SearchParams).countDocuments()])

  const totalPages = Math.ceil(totalDocs / limit)

  return {
    docs,
    totalDocs,
    totalPages,
    page,
    limit,
    order,
    sort,
  }
}

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category
