import { patients as mockPatients } from '../mocks/patients';

export async function deletePatient(id: string) {
  const idx = mockPatients.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error('Patient not found');
  mockPatients.splice(idx, 1);
  return Promise.resolve({ success: true });
}

export async function createPatient(patient: any) {
  mockPatients.push({ ...patient, id: (mockPatients.length + 1).toString() });
  return Promise.resolve(patient);
}

export async function updatePatient(id: string, patient: any) {
  const idx = mockPatients.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error('Patient not found');
  mockPatients[idx] = { ...patient, id };
  return Promise.resolve(mockPatients[idx]);
}

export async function getPatient(id: string) {
  const patient = mockPatients.find((p) => p.id === id);
  if (!patient) throw new Error('Patient not found');
  return Promise.resolve(patient);
}

export async function getPatients() {
  return Promise.resolve([...mockPatients]);
}
