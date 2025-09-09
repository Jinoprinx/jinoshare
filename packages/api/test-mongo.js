const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jinoshareDB";

console.log('Testing MongoDB connection...');
console.log('Connection string:', MONGODB_URI.replace(/\/\/.*@/, "//***:***@"));

const options = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
};

mongoose.connect(MONGODB_URI, options)
  .then(() => {
    console.log('✅ MongoDB connection successful');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    if (err.message.includes('ENOTFOUND')) {
      console.error('Network error - check internet connection');
    } else if (err.message.includes('Authentication failed')) {
      console.error('Authentication error - check username/password');
    } else if (err.message.includes('Server selection timed out')) {
      console.error('Timeout error - check network/firewall settings');
    }
    process.exit(1);
  });