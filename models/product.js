// ------------------------------
// Product Model
// ------------------------------

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Refs
const Category = require('./Category')
const Provider = require('./Provider')

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: Category,
  },
  link: {
    type: String,
  },
  brand: {
    type: String,
  },
  weight: {
    type: Number,
  },
  price: {
    type: Number,
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: Provider,
  },
  alternatives: {
    type: [Schema.Types.ObjectId],
    ref: 'Product',
  },
},
{
  timestamps: true,
  toJSON: { virtuals: true },
})

ProductSchema.pre('save', async function (next) {
  // const product = this
  next()
})

// Custom Methods
ProductSchema.statics.search = async function search (params, cb) {
  const limit = params.limit ? parseInt(params.limit) : 10
  const page = params.page ? parseInt(params.page) : 1
  const sort = params.sort ? params.sort : 'createdAt'
  const order = params.order && params.order === 'ASC' ? '+' : '-'
  const items = params.items ? params.items.replace(/,/g, ' ') : ''

  const SearchParams = {}

  if (params.name) {
    SearchParams.name = new RegExp(params.name, 'i')
  }

  if (params.active) {
    SearchParams.active = params.active
  }

  if (params.category) {
    SearchParams.category = params.category
  }

  if (params.brand) {
    SearchParams.brand = params.brand
  }

  if (params.provider) {
    SearchParams.provider = params.provider
  }

  const [docs, totalDocs] = await Promise.all([
    Product
      .find(SearchParams, items)
      .sort(order + sort)
      .populate('category', 'name color')
      .populate('alternatives', 'name color')
      .populate('provider', 'name')
      .limit(limit)
      .skip((limit * page) - limit)
      .lean(),
    Product.find(SearchParams).countDocuments()])

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

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
