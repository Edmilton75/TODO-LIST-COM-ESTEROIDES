import { useState, type FormEvent } from "react";
import './App.css'

interface Task {
  id: number;
  title: string;
  completed: boolean;
}
function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {id: 1, title: 'Contar os frangos que chegaram', completed: false},
    {id: 2, title: 'Verificar saidas de produtos', completed: true},
  ])

  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTaskTitle.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };


  const handleDeleteTask = (taskIdDelete: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskIdDelete);
    setTasks(updatedTasks)
  };

  const handleToggleComplete = (taskIdToToggle: number) => {
    const updatedTasks = tasks.map(task => task.id === taskIdToToggle ? { ...task, completed: !task.completed} : task)
    setTasks(updatedTasks)
  }

  return (
    <div className="App">
      <h1>TODO-LIST COM ESTEROIDE💉</h1>

      <form onSubmit={handleAddTask} className="task-form">
        <input type="text" value={newTaskTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)} placeholder="O que precisa ser feito?" />
        <button type="submit">Adicionar</button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task.id)} />
            <span>{task.title}</span>
            <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default App;