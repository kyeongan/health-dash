export async function deletePatient(id: string) {
  const res = await fetch(
    `http://localhost:8000/patients/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) throw new Error(`Network error (${res.status})`);
  return res.json();
}
export async function createPatient(patient: any) {
  const res = await fetch('http://localhost:8000/patients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  });
  if (!res.ok) throw new Error(`Network error (${res.status})`);
  return res.json();
}

export async function updatePatient(id: string, patient: any) {
  const res = await fetch(
    `http://localhost:8000/patients/${encodeURIComponent(id)}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patient),
    }
  );
  if (!res.ok) throw new Error(`Network error (${res.status})`);
  return res.json();
}
export async function getPatient(id: string) {
  const res = await fetch(
    `http://localhost:8000/patients/${encodeURIComponent(id)}`
  );
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error('Permission denied (not authorized)');
    } else if (res.status === 404) {
      throw new Error('Patient not found');
    } else {
      throw new Error(`Network error (${res.status})`);
    }
  }
  return res.json();
}
export async function getPatients() {
  const res = await fetch('http://localhost:8000/patients');
  if (!res.ok) throw new Error(`Network error (${res.status})`);
  return res.json();
}
