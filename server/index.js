require('dotenv').config(); // Подключаем dotenv для работы с .env
const { MongoClient } = require('mongodb');

// Получаем строку подключения из .env
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");

    const database = client.db(dbName);
    return database;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err; // Прокидываем ошибку наверх
  }
}

module.exports = connectToDatabase;
