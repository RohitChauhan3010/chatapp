const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true
  }
});

const ProductModel = mongoose.model('product', productSchema);

module.exports = { ProductModel };