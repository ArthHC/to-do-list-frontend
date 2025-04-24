const API_URL = "http://localhost:3000";

export async function getToDoList() {
  console.log('API_URL', API_URL);
  console.log('Getting to-do list...');
  const res = await fetch(`${API_URL}/todos`, { cache: 'no-store' });
  return res.json();
}

export async function createToDo(data: { title: string }) {
  const res = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteToDo(id: number) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Erro ao deletar a tarefa');
  }

  return res.json();
}