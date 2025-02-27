const rateLimitMiddleware = require('../middleware/rateLimitMiddleware');

const sampleController = (req, res) => {
  res.status(200).json({ message: 'Request successful!' });
};

module.exports = { sampleController, rateLimitMiddleware };
