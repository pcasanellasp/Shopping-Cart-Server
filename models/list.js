// ------------------------------
// List Model
// ------------------------------

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./Product')

const ListSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: Product,
  }],
  status: {
    type: String,
    enum: ['started', 'canceled', 'completed'],
    required: true,
    default: 'started',
  },
  CompletedAt: {
    type: Date,
  },
},
{
  timestamps: true,
  toJSON: { virtuals: true },
})

ListSchema.pre('save', async function (next) {
  // const list = this
  next()
})

// Custom Methods
ListSchema.statics.search = async function search (params, cb) {
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
    List
      .find(SearchParams, items)
      .sort(order + sort)
      .limit(limit)
      .skip((limit * page) - limit)
      .lean(),
    List.find(SearchParams).countDocuments()])

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

const List = mongoose.model('List', ListSchema)
module.exports = List
