const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  { id:1, title: 'Fazer uma api', completed: false },
  { id:2, title: 'abrir os frangos', completed: true}
]
let nextTaskId = 3;

app.post('/tasks', (req,res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'O titulo é obrigatório.'})
  }

  const newTask = {
    id: nextTaskId++,
    title: title,
    completed: false,
  }

  tasks.push(newTask);
  console.log('Task criada:', newTask);
  res.status(201).json(newTask);

})

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  const { title, completed } = req.body

  const taskToUpdate = tasks.find(task => task.id === taskId)
  
  if(!taskToUpdate) {
    return res.status(404).json({ error: 'Tarefa não encontrada.'});
  }

  if(title !== undefined) {
    taskToUpdate.title = title;
  }

  if(completed !== undefined) {
    taskToUpdate.completed = completed;
  }

  console.log('Task atualizada', taskToUpdate);
  res.json(taskToUpdate)
})

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id = taskId)

  if(taskId === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada.'})
  }

  tasks.splice(taskIndex, 1);
  console.log(`Task deletada: id=${taskId}`);
  res.status(204).send()
})

const PORT = 3001;
app.listen(PORT, () =>{
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`)
})