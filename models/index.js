const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.once('open', () => console.log(`Connected to MongoDB at ${db.host}:${db.port}`));
db.on('error', (error) => console.log('Database error\n', error));

module.exports = {
    
}