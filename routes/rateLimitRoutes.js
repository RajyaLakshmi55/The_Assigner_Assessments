const express = require('express');
const { sampleController } = require('../controllers/rateLimitController');
const rateLimitMiddleware=require('../middleware/rateLimitMiddleware')

const router = express.Router();

router.use(rateLimitMiddleware); // Apply the rate-limiting middleware globally

router.get('/sample-endpoint', sampleController);

module.exports = router;
