'use client';

import { useEffect, useState } from 'react';
import { getToDoList, createToDo } from '@/services/api';

type Task = {
  id: number;
  title: string;
  creationDate: Date;
};

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    getToDoList()
      .then((todos) => console.log('Tarefas:', todos))
      .catch((error) => console.error('Erro ao buscar tarefas:', error));
  }, []);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    const newTask = await createToDo({ title: newTaskTitle });
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Minha To-Do List</h1>
      <h1 className="text-2xl font-bold mb-4">Teste</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Digite uma nova tarefa"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}