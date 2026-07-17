// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/todoDB';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Database Schema Updated (Added completed field)
const TaskSchema = new mongoose.Schema({ 
    title: String,
    completed: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', TaskSchema);

// Route 1: Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Route 2: Create a new task
app.post('/tasks', async (req, res) => {
    const newTask = new Task({ title: req.body.title, completed: false });
    await newTask.save();
    res.json(newTask);
});

// Route 3: Update task status (Complete/Incomplete)
app.put('/tasks/:id', async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id, 
        { completed: req.body.completed },
        { new: true }
    );
    res.json(updatedTask);
});

app.listen(5000, () => console.log('Backend API running on port 5000'));