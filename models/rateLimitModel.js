const mongoose = require('mongoose');

const rateLimitSchema = new mongoose.Schema({
  ipAddress: { 
    type: String,
     required: true
     },
  requestCount: {
     type: Number,
      default: 0 
    },
  lastReset: { 
    type: Date, 
    default: Date.now
 },
});

// Create the model from the schema
const RateLimit = mongoose.model('RateLimit', rateLimitSchema);

module.exports = RateLimit;
