const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');

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

