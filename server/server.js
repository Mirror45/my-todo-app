const express = require('express');
const connectToDatabase = require('./index'); // Импортируем подключение к базе данных
const { ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


// Middleware для обработки JSON
app.use(express.json());
app.use(cors()); // Это позволит клиенту с порта 3001 делать запросы к серверу на порту 3000

// Подключаемся к базе данных и запускаем сервер
connectToDatabase().then((database) => {
  const tasksCollection = database.collection('tasks');

  // Маршрут для получения всех задач
  app.get('/tasks', async (req, res) => {
    try {
      const tasks = await tasksCollection.find({}).toArray();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });

  // Маршрут для добавления новой задачи
  app.post('/tasks', async (req, res) => {
    try {
      const newTask = req.body; // Получаем данные из запроса
      const result = await tasksCollection.insertOne(newTask);
      res.status(201).json({ insertedId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add task' });
    }
  });

  // Маршрут для обновления задачи
  app.put('/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTask = req.body;
      console.log('Updating task with id:', id);
      console.log('Updated data:', updatedTask);
  
      const result = await tasksCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedTask }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      const task = await tasksCollection.findOne({ _id: new ObjectId(id) });
      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  });

  // Маршрут для удаления задачи
  app.delete('/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.status(200).json({ message: 'Task deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });

  // Запуск сервера
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err);
});

// Маршрут для главной страницы
app.get("/", (req, res) => {
    res.send("Welcome to the server!");
});
