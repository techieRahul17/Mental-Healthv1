const { MongoClient, ObjectId } = require('mongodb');

let db;

async function connectDB() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db();
  console.log('Connected to MongoDB');
  return db;
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB, ObjectId };
