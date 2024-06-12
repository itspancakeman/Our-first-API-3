const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    numberOfItems: { type: Number, required: true}, 
    totalPrice: {type: Number, required: true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;