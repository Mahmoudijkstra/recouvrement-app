const mongoose = require("mongoose");

async function connectDB() {
  // This only catches errors for initial connection don't forget to add active listening for database
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
