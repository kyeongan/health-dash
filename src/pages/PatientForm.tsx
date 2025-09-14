import { useState, useEffect } from 'react';
import type { Medication } from '../types/patient';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import type { Patient } from '../types/patient';

interface PatientFormProps {
  initialData?: Partial<Patient>;
  onSubmit?: (data: Patient) => void;
}

export default function PatientForm({ initialData, onSubmit }: PatientFormProps) {
  // All patient fields
  const [firstName, setFirstName] = useState(initialData?.firstName || '');
  const [lastName, setLastName] = useState(initialData?.lastName || '');
  const [dateOfBirth, setDateOfBirth] = useState(initialData?.dateOfBirth || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(initialData?.gender || 'other');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [address, setAddress] = useState(initialData?.address || { street: '', city: '', state: '', zipCode: '', country: '' });
  const [emergencyContact, setEmergencyContact] = useState(initialData?.emergencyContact || { name: '', relationship: '', phone: '', email: '' });
  const [allergies, setAllergies] = useState<string[]>(initialData?.medicalInfo?.allergies || []);
  const [currentMedications, setCurrentMedications] = useState<Medication[]>(initialData?.medicalInfo?.currentMedications || []);
  const [medicationInput, setMedicationInput] = useState('');
  const [conditions, setConditions] = useState<string[]>(initialData?.medicalInfo?.conditions || []);
  const [bloodType, setBloodType] = useState<'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'>((initialData?.medicalInfo?.bloodType as 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-') || 'A+');
  const [lastVisit, setLastVisit] = useState(initialData?.medicalInfo?.lastVisit || '');
  const [status, setStatus] = useState<'active' | 'inactive' | 'critical'>(initialData?.medicalInfo?.status || 'active');
  const [insurance, setInsurance] = useState(initialData?.insurance || { provider: '', policyNumber: '', effectiveDate: '', copay: 0, deductible: 0 });
  const [documents, setDocuments] = useState<File[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Auto-save draft to localStorage
  useEffect(() => {
    const draft = {
      firstName, lastName, dateOfBirth, email, phone, address, emergencyContact,
      allergies, currentMedications, conditions, bloodType, lastVisit, status, insurance
    };
    localStorage.setItem('patientFormDraft', JSON.stringify(draft));
  }, [firstName, lastName, dateOfBirth, email, phone, address, emergencyContact, allergies, currentMedications, conditions, bloodType, lastVisit, status, insurance]);

  useEffect(() => {
    const saved = localStorage.getItem('patientFormDraft');
    if (saved && !initialData) {
      try {
        const d = JSON.parse(saved);
        setFirstName(d.firstName || '');
        setLastName(d.lastName || '');
        setDateOfBirth(d.dateOfBirth || '');
        setEmail(d.email || '');
        setPhone(d.phone || '');
        setAddress(d.address || { street: '', city: '', state: '', zipCode: '', country: '' });
        setEmergencyContact(d.emergencyContact || { name: '', relationship: '', phone: '', email: '' });
        setAllergies(d.allergies || []);
  setCurrentMedications(d.currentMedications || []);
        setConditions(d.conditions || []);
        setBloodType(d.bloodType || 'A+');
        setLastVisit(d.lastVisit || '');
        setStatus(d.status || 'active');
        setInsurance(d.insurance || { provider: '', policyNumber: '', effectiveDate: '', copay: 0, deductible: 0 });
      } catch {
        // ignore
      }
    }
  }, [initialData]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
  if (!firstName) errs.firstName = 'First name is required';
  if (!lastName) errs.lastName = 'Last name is required';
  if (!dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
  if (!gender) errs.gender = 'Gender is required';
    if (!email) errs.email = 'Email is required';
    if (!address.street) errs.street = 'Street is required';
    if (!address.city) errs.city = 'City is required';
    if (!address.state) errs.state = 'State is required';
    if (!address.zipCode) errs.zipCode = 'Zip code is required';
    if (!address.country) errs.country = 'Country is required';
    if (!emergencyContact.name) errs.ecName = 'Emergency contact name is required';
    if (!emergencyContact.relationship) errs.ecRel = 'Emergency contact relationship is required';
    if (!emergencyContact.phone) errs.ecPhone = 'Emergency contact phone is required';
    if (!insurance.provider) errs.insProvider = 'Insurance provider is required';
    if (!insurance.policyNumber) errs.insPolicy = 'Policy number is required';
    if (!insurance.effectiveDate) errs.insEff = 'Effective date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Always preserve id, createdAt, and existing documents when editing
    const patient: Patient = {
      id: initialData?.id || Math.random().toString(36).slice(2),
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phone,
      address,
      emergencyContact,
      medicalInfo: {
        allergies,
        currentMedications,
        conditions,
        bloodType,
        lastVisit,
        status,
      },
      insurance,
      documents: initialData?.documents ? [...initialData.documents] : [],
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // File upload: just store file names for now
    if (photo) {
      // Remove any existing photo_id document
      patient.documents = patient.documents.filter(doc => doc.type !== 'photo_id');
      patient.documents.push({
        id: `${patient.id}-photo`,
        type: 'photo_id',
        name: photo.name,
        uploadDate: new Date().toISOString(),
        fileSize: photo.size,
        mimeType: photo.type,
        url: URL.createObjectURL(photo),
      });
    }
    if (documents.length > 0) {
      patient.documents = [
        ...patient.documents,
        ...documents.map((file, i) => ({
          id: `${patient.id}-doc${i}`,
          type: 'other' as const,
          name: file.name,
          uploadDate: new Date().toISOString(),
          fileSize: file.size,
          mimeType: file.type,
          url: URL.createObjectURL(file),
        }))
      ];
    }
    localStorage.removeItem('patientFormDraft');
    onSubmit?.(patient);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {initialData ? 'Edit Patient' : 'Add Patient'}
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Personal Information</Typography>
            <TextField label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} error={!!errors.firstName} helperText={errors.firstName} required />
            <TextField label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} error={!!errors.lastName} helperText={errors.lastName} required />
            <TextField label="Date of Birth" type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} error={!!errors.dateOfBirth} helperText={errors.dateOfBirth} required InputLabelProps={{ shrink: true }} />
            <TextField label="Gender" select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female' | 'other')} SelectProps={{ native: true }} error={!!errors.gender} helperText={errors.gender} required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </TextField>
            <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} required />
            <TextField label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
            <Typography variant="subtitle1">Address</Typography>
            <TextField label="Street" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} error={!!errors.street} helperText={errors.street} required />
            <TextField label="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} error={!!errors.city} helperText={errors.city} required />
            <TextField label="State" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} error={!!errors.state} helperText={errors.state} required />
            <TextField label="Zip Code" value={address.zipCode} onChange={e => setAddress({ ...address, zipCode: e.target.value })} error={!!errors.zipCode} helperText={errors.zipCode} required />
            <TextField label="Country" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} error={!!errors.country} helperText={errors.country} required />
            <Typography variant="subtitle1">Emergency Contact</Typography>
            <TextField label="Name" value={emergencyContact.name} onChange={e => setEmergencyContact({ ...emergencyContact, name: e.target.value })} error={!!errors.ecName} helperText={errors.ecName} required />
            <TextField label="Relationship" value={emergencyContact.relationship} onChange={e => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })} error={!!errors.ecRel} helperText={errors.ecRel} required />
            <TextField label="Phone" value={emergencyContact.phone} onChange={e => setEmergencyContact({ ...emergencyContact, phone: e.target.value })} error={!!errors.ecPhone} helperText={errors.ecPhone} required />
            <TextField label="Email" value={emergencyContact.email} onChange={e => setEmergencyContact({ ...emergencyContact, email: e.target.value })} />
            <Typography variant="subtitle1">Medical Info</Typography>
            <TextField label="Allergies (comma separated)" value={allergies.join(', ')} onChange={e => setAllergies(e.target.value.split(',').map(s => s.trim()))} />
            <TextField label="Add Medication (name only for demo)" value={medicationInput} onChange={e => setMedicationInput(e.target.value)} onKeyDown={e => {
              if (e.key === 'Enter' && medicationInput.trim()) {
                setCurrentMedications([...currentMedications, {
                  id: Math.random().toString(36).slice(2),
                  name: medicationInput.trim(),
                  dosage: '', frequency: '', prescribedBy: '', startDate: '', isActive: true
                }]);
                setMedicationInput('');
                e.preventDefault();
              }
            }} helperText="Press Enter to add. Edit details after save." />
            {currentMedications.length > 0 && (
              <ul>
                {currentMedications.map((m) => (
                  <li key={m.id}>{m.name}</li>
                ))}
              </ul>
            )}
            <TextField label="Conditions (comma separated)" value={conditions.join(', ')} onChange={e => setConditions(e.target.value.split(',').map(s => s.trim()))} />
            <TextField label="Blood Type" select value={bloodType} onChange={e => setBloodType(e.target.value as 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-')} SelectProps={{ native: true }}>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </TextField>
            <TextField label="Last Visit" type="date" value={lastVisit} onChange={e => setLastVisit(e.target.value)} InputLabelProps={{ shrink: true }} />
            <TextField label="Status" select value={status} onChange={e => setStatus(e.target.value as 'active' | 'inactive' | 'critical')} SelectProps={{ native: true }}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
              <option value="critical">critical</option>
            </TextField>
            <Typography variant="subtitle1">Insurance Info</Typography>
            <TextField label="Provider" value={insurance.provider} onChange={e => setInsurance({ ...insurance, provider: e.target.value })} error={!!errors.insProvider} helperText={errors.insProvider} required />
            <TextField label="Policy Number" value={insurance.policyNumber} onChange={e => setInsurance({ ...insurance, policyNumber: e.target.value })} error={!!errors.insPolicy} helperText={errors.insPolicy} required />
            <TextField label="Effective Date" type="date" value={insurance.effectiveDate} onChange={e => setInsurance({ ...insurance, effectiveDate: e.target.value })} error={!!errors.insEff} helperText={errors.insEff} required InputLabelProps={{ shrink: true }} />
            <TextField label="Copay" type="number" value={insurance.copay} onChange={e => setInsurance({ ...insurance, copay: Number(e.target.value) })} />
            <TextField label="Deductible" type="number" value={insurance.deductible} onChange={e => setInsurance({ ...insurance, deductible: Number(e.target.value) })} />
            <Typography variant="subtitle1">Photo</Typography>
            <Button variant="outlined" component="label">
              Upload Photo
              <input type="file" accept="image/*" hidden onChange={e => setPhoto(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
            </Button>
            {photo && <Typography variant="body2">Selected: {photo.name}</Typography>}
            <Typography variant="subtitle1">Documents</Typography>
            <Button variant="outlined" component="label">
              Upload Files
              <input type="file" multiple hidden onChange={e => setDocuments(e.target.files ? Array.from(e.target.files) : [])} />
            </Button>
            {documents.length > 0 && (
              <ul>
                {documents.map((file, i) => (
                  <li key={i}>{file.name}</li>
                ))}
              </ul>
            )}
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
