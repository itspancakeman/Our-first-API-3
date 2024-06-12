//tevin --
const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Product } = require('./models');
const { ProductReview } = require('./models');
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
//====== CART GET ======
app.get('/cart', async (req, res) => {
    try  {
        const cart = await Cart.find({});
        res.render('cart', { cart });
    } catch (error) {
        console.log('----error----\n');
        res.send('error fetching cart');
    }
})

//====== ORDER GET =====
app.get('/checkout', async (req, res) => {
    try {
        const order = await Order.find({});
        res.render('order', { order });
    }
    catch (error) {
        console.log('----error----\n');
        res.send('error fetching checkout');
    }
})
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
//===== NEW PRODUCT POST =====
app.post('products/new', urlencodedParser, async (req, res) => {
    const {title, brand, price, inStock, specs, shippedBy, soldBy, reviews, photos} = req.body;
    
    try {
        const newProduct = await Product.create({
            title,
            brand,
            price,
            inStock,
            specs,
            shippedBy,
            soldBy,
            reviews,
            photos
        })
        res.send('Product created. Thanks! 😀');
    } catch (error) {
        console.log('----error----\n', error);
        res.send('Error creating product. Please try again');
    }
});
//collin --

//collin --
//====== EDIT PRODUCT PUT ======
app.put('/products/:id', urlencodedParser, async(req, res) => {
    const {title, brand, price, inStock, specs, shippedBy, soldBy, reviews, photos} = req.body;
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { id: req.params.id },
            {
                title,
                brand,
                price,
                inStock,
                specs,
                shippedBy,
                soldBy,
                reviews,
                photos
            },
        );
        if (updatedProduct) {
            res.JSON(updatedProduct);
        } else {
            res.send('Error product not found.');
        }
    } catch (error) {
        console.log('-----error----\n', error);
        res.send('Error updating product, please try again.');
    }
});
//collin --

//collin --
//===== DELETE PRODUCT DELETE =====
app.delete('/products/:id', (req, res) => {
    try {
        Product.deleteOne({ id: req.params.id }).then(function(){
            res.send('Product deleted!')
            res.JSON('/products');
        })   
    } catch (error) {
        console.log('-----error-----\n', error);
        res.send('Error deleting product, please try again.');
    }
});
//collin --

//collin --
//====== ALL PRODUCT REVIEW GET ======
app.get('/products/:id/reviews', async (req, res) => {
    try {
        const foundProduct = await Product.findOne({ id: req.params.id })
        if (foundProduct) {
            const productReviews = await ProductReview.find({ title: {$gt: 0} })
            res.json(productReviews);   
        }
    } catch (error) {
        console.log('----error----\n', error);
        res.send('error fetching product reviews 😢');
    }
});
//collin --