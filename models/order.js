const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shipping: {
        fullName: { type: String, required: true },
        countryRegion: {},
        address: { type: String, required: true},
        city: { type: String, required: true },
        state: {},
        zipCode: { type: Number, required: true },
        phone: {
            type: String,
            validate: {
                validator: function(v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, 'Your phone is required']
        }
    }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;