require('dotenv').config(); // Подключаем dotenv для работы с .env

const { MongoClient } = require('mongodb');

// Получаем строку подключения из .env
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Функция для подключения к базе данных
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");

    const database = client.db(dbName);
    const tasksCollection = database.collection('tasks');

    // Пример CRUD операций

    // 1. Создание задачи (Create)
    const task = { text: "Test task", done: false };
    const result = await tasksCollection.insertOne(task);
    console.log("Inserted task with id:", result.insertedId);

    // 2. Чтение задач (Read)
    const tasks = await tasksCollection.find({}).toArray();
    console.log("Tasks:", tasks);

    // 3. Обновление задачи (Update)
    const updatedTask = await tasksCollection.updateOne(
      { _id: result.insertedId },
      { $set: { done: true } }
    );
    console.log("Updated task:", updatedTask);

    // 4. Удаление задачи (Delete)
    const deleteResult = await tasksCollection.deleteOne({ _id: result.insertedId });
    console.log("Deleted task:", deleteResult);

    await client.close();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDatabase();
