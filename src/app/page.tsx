'use client';

import { useEffect, useState } from 'react';
import { getToDoList } from '@/services/api';

type Task = {
  id: number;
  title: string;
};

export default function HomePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getToDoList().then(setTasks);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Minha To-Do List</h1>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
