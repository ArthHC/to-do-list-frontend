"use client";

import { useEffect, useState } from "react";
import { getToDoList, createToDo, deleteToDo } from "@/services/api";
import { TrashIcon } from '@heroicons/react/24/outline';

type Task = {
  createdAt: Date;
  id: number;
  title: string;
};

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    getToDoList()
      .then((todos) => {
        setTasks(todos.tasks);
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefas:", error);
      });
  }, []);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    const newTask = await createToDo({ title: newTaskTitle });
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle("");
    getToDoList().then((todos) => setTasks(todos.tasks));
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteToDo(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <div className="to-do-container">
      <h1 className="text-2xl font-bold mb-4">Minhas tarefas</h1>

      <div className="mb-4 w-1/2 flex gap-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Digite uma nova tarefa"
          className="border p-2 mr-2 rounded-[0.9vw] w-full"
        />
        <button
          onClick={handleAddTask}
          className="bg-cyan-500 text-white px-4 py-2 border border-blue-200 rounded-[0.9vw] cursor-pointer hover:bg-cyan-600 transition-colors duration-300"
        >
          Adicionar
        </button>
      </div>

      <ul className="flex flex-col gap-2 w-auto">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between gap-4 p-4 rounded shadow list-to-do"
          >
            <span>{task.title}</span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-6 w-6 cursor-pointer" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
