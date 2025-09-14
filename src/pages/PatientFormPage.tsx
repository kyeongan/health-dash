import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PatientForm from './PatientForm';
import type { Patient } from '../types/patient';

export default function PatientFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<Partial<Patient> | undefined>(undefined);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:8000/patients/${encodeURIComponent(id)}`)
        .then((res) => res.json())
        .then((data) => {
          setInitialData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (patient: Patient) => {
    if (id) {
      // Edit mode
      await fetch(`http://localhost:8000/patients/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      });
    } else {
      // Create mode
      await fetch('http://localhost:8000/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      });
    }
    navigate('/patients');
  };

  if (loading) return <div>Loading...</div>;

  return <PatientForm initialData={initialData} onSubmit={handleSubmit} />;
}
