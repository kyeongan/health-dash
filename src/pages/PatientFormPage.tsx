import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPatient, createPatient, updatePatient } from '../services/api';
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
      getPatient(id)
        .then((data) => {
          setInitialData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (patient: Patient) => {
    if (id) {
      await updatePatient(id, patient);
    } else {
      await createPatient(patient);
    }
    navigate('/patients');
  };

  if (loading) return <div>Loading...</div>;

  return <PatientForm initialData={initialData} onSubmit={handleSubmit} />;
}
