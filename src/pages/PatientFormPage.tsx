import { useNavigate } from 'react-router-dom';
import PatientForm from './PatientForm';
import type { Patient } from '../types/patient';

export default function PatientFormPage() {
  const navigate = useNavigate();

  const handleSubmit = async (patient: Patient) => {
    await fetch('http://localhost:8000/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patient),
    });
    navigate('/patients');
  };

  return <PatientForm onSubmit={handleSubmit} />;
}
