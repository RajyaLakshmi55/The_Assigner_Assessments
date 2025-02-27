// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { getItems } = require('../controllers/itemController');

router.get('/get', getItems);

module.exports = router;