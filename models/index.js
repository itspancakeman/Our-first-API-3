const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI

mongoose.connect(uri);

const db = mongoose.connection;

db.once('open', () => console.log(`Connected to MongoDB at ${db.host}:${db.port}`));
db.on('error', (error) => console.log('Database error\n', error));

const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Order = require('./order');

module.exports = {
    User, Product, Cart, Order, 
}