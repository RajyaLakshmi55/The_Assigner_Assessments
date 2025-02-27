const RateLimit = require('./rateLimitModel');  // Import the model

const rateLimit = async (req, res, next) => {
  const rateLimitWindow = 60 * 1000; // 1 minute in milliseconds
  const maxRequests = 10;
  const userIp = req.ip;

  try {
    // Find or create a new rate limit entry for the user's IP address
    let rateLimitData = await RateLimit.findOne({ ipAddress: userIp });

    // If no rate limit entry exists, create one
    if (!rateLimitData) {
      rateLimitData = new RateLimit({ ipAddress: userIp });
      await rateLimitData.save();
    }

    const currentTime = Date.now();
    
    // Reset the request count if the last reset was more than a minute ago
    if (currentTime - rateLimitData.lastReset > rateLimitWindow) {
      rateLimitData.requestCount = 0;
      rateLimitData.lastReset = currentTime;
      await rateLimitData.save();
    }

    // Check if the user has exceeded the request limit
    if (rateLimitData.requestCount >= maxRequests) {
      return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }

    // Otherwise, increment the request count and save it
    rateLimitData.requestCount += 1;
    await rateLimitData.save();

    next();  // Proceed to the next middleware/controller
  } catch (error) {
    console.error('Rate limiting error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = rateLimit;
