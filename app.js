const dotenv = require('dotenv');
const express = require('express'); 


const connectDB = require('./config/db');
const { getItems } = require('./controllers/itemcontroler');
const {simpleController} =require('./controllers/rateLimitController')

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use('/api/item', getItems)

app.use('/api/limit', simpleController)

module.exports = app;