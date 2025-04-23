const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
