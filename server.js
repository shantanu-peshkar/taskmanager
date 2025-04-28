const express = require('express');
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 3000;
const API_KEY = 'mysecretkey123';
app.use(express.json());

let tasks = []; 

function authenticate(req, res, next) {
 const authHeader = req.headers['authorization'];
 if (!authHeader || !authHeader.startsWith("Bearer ")) 
    {
    return res.status(401).json({ error: "Authorization header missing or malformed" });
    }
  const token = authHeader.split(' ')[1];
    if (token !== API_KEY)
    {
        return res.status(401).json({ error: "Invalid Api Key" });
    }
    next();
}

app.get("/tasks", (req, res) =>
  { 
    let { page = 1, limit = 5, sortBy = "createdAt", order = "asc", title } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let filteredTasks = [...tasks]; 

    if (title) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    filteredTasks.sort((a, b) => {
      if (order === 'desc')
     {
            return a[sortBy] < b[sortBy] ? 1 : -1;
     } else
      {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        }
    });

 const startIndex = (page - 1) * limit;
 const endIndex = page * limit;
 const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    res.status(200).json({
        totalTasks: filteredTasks.length,
        page,
        limit,
        tasks: paginatedTasks
    });
});

app.get('/tasks/:id', (req, res) => {
 const taskId = req.params.id;  
 const task = tasks.find(t => t.id === taskId); 
 if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
  res.status(200).json(task);
});

app.post('/tasks', authenticate, (req, res) => {
 const { title, description } = req.body;

 if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
    }

const newTask = {
        id: uuidv4(),
        title,
        description,
        createdAt: new Date().toISOString()
    };
      tasks.push(newTask);
     res.status(201).json(newTask);
});

app.put('/tasks/:id', authenticate, (req, res) => {
    const { title, description } = req.body;
     const taskId = req.params.id; 
    const taskIndex = tasks.findIndex(t => t.id === taskId); 

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

      tasks[taskIndex].title = title;
     tasks[taskIndex].description = description;
    res.status(200).json(tasks[taskIndex]);
});

app.delete('/tasks/:id', authenticate, (req, res) => {
     const taskId = req.params.id; // Capture task ID
    const taskIndex = tasks.findIndex(t => t.id === taskId); // Use taskId

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
});

app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
