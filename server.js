//tevin --
const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Product } = require('./models');
const { User } = require('./models');
const { Cart } = require('./models');
const { Order } = require('./models');

// ----------- MIDDLEWARE ---------
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true
}));

//tevin --


//collin --
//====== ALL PRODUCTS GET ======
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({ title: {$gt: 0} })
        res.json(products);
    } catch (error) {
        console.log('----error----\n', error);
        res.send('error fetching products 😢');
    }
});
//collin --

//collin --
//===== ONE PRODUCT GET =====
app.get('/products/:id', async (req, res) => {
    try {
        const foundProduct = await Product.findOne({ id: req.params.id })
        if (foundProduct.title && foundProduct.brand && foundProduct.price && foundProduct.inStock && 
            foundProduct.specs && foundProduct.shippedBy && foundProduct.soldBy) {
                res.json(foundProduct);
            }
    } catch (error) {
        console.log('-----error-----\n', error);
        res.send('error fetching this product 😢')
    }
});
//collin --

//collin --
//===== 
//collin --