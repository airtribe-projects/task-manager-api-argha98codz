const express = require('express');
const app = express();
const port = 3000;

const tasks = [];

const validateTask = (task) => {
    if (!task.title || task.title === '') {
        return 'Title is required';
    }
    if (!task.description || task.description === '') {
        return 'Description is required';
    }
    if (typeof task.completed !== 'boolean') {
        return 'Completed is required to be boolean';
    }
    if (!['low', 'medium', 'high'].includes(task.priority)) {
        return 'Priority must be low, medium or high!';
    }
    return null;
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/tasks', (req, res) => {
    const { completed } = req.query;
    let filteredTasks = tasks;

    if (completed !== undefined) {
        const isCompleted = completed.toLowerCase() === 'true';
        filteredTasks = tasks.filter(task => task.completed === isCompleted);
    }
    filteredTasks.sort((a, b) => new Date(b.taskCreatedAt) - new Date(a.taskCreatedAt));
    res.json(filteredTasks);
});

app.get('/tasks/priority/:level', (req, res) => {
    const { level } = req.params;
    if (!['low', 'medium', 'high'].includes(level)) {
        return res.status(400).send('Invalid priority level');
    }
    const filteredTasks = tasks.filter(task => task.priority === level);
    res.json(filteredTasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find((task) => task.id === parseInt(req.params.id, 10));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    res.json(task);
});

app.post('/tasks', (req, res) => {
    const task = req.body;
    task.id = tasks.length + 1;
    task.taskCreatedAt = new Date().toISOString();
    task.taskUpdatedAt = new Date().toISOString();
    
    const error = validateTask(task);
    if (error) {
        return res.status(400).send(error);
    }
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find((task) => task.id === parseInt(req.params.id, 10));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    task.title = req.body.title;
    task.description = req.body.description;
    task.completed = req.body.completed;
    task.taskUpdatedAt = new Date().toISOString();
    
    const error = validateTask(task);
    if (error) {
        return res.status(400).send(error);
    }
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const task = tasks.find((task) => task.id === parseInt(req.params.id, 10));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    res.status(200).send('Task Deleted');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;
