const dotenv = require('dotenv');
const express = require('express'); 


const connectDB = require('./config/db');
const { itemRoutes } = require('./routes/itemRoutes');
const {rateLimitRoute} =require('./routes/rateLimitRoutes');
const {authRoutes}= require('./routes/authRoutes')

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use('/api/item', itemRoutes)

app.use('/api/limit', rateLimitRoute)

app.use('/api/auth', authRoutes);


module.exports = app;