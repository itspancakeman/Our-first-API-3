//collin --

const mongoose = require('mongoose');
const ProductReview = require('./productreview');

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    brand: {type: String, required: true},
    price: {type: String, required: true},
    inStock: {type: Boolean, required: true},
    specs: {type: Object, required: true},
    shippedBy: {type: String, required: true},
    soldBy: {type: String, required: true},
    photos: {type: File, required: false},
    child: ProductReview
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

//collin --