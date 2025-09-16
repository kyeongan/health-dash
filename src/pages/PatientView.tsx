import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { getPatient } from '../services/api';
import { useAppStore } from '../store/appStore';
import type { Patient } from '../types/patient';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// Delete button component
import { deletePatient } from '../services/api';
function DeletePatientButton({ id }: { id: string }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    setLoading(true);
    await deletePatient(id);
    setLoading(false);
    navigate('/patients');
  };
  return (
    <Button color="error" variant="outlined" size="small" onClick={handleDelete} disabled={loading} sx={{ ml: 2 }}>
      {loading ? 'Deleting...' : 'Delete'}
    </Button>
  );
}


// Add EditPatientButton component
function EditPatientButton({ id }: { id: string }) {
  const navigate = useNavigate();
  return (
    <Button
      color="primary"
      variant="outlined"
      size="small"
      onClick={() => navigate(`/patients/${id}/edit`)}
      sx={{ ml: 2 }}
    >
      Edit
    </Button>
  );
}

export default function PatientView() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const addNotification = useAppStore((s) => s.addNotification);
  useEffect(() => {
    if (!id) {
      setPatient(null);
      setLoading(false);
      return;
    }
    getPatient(id)
      .then((data) => {
        setPatient(data);
        setLoading(false);
      })
      .catch((err) => {
        addNotification({ message: err.message || 'Network error: Could not connect to server', type: 'error' });
        setPatient(null);
        setLoading(false);
      });
  }, [id, addNotification]);

  if (loading) {
    return <Box sx={{ mt: 4 }}><Typography>Loading...</Typography></Box>;
  }
  if (!patient) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          Patient not found
        </Typography>
      </Box>
    );
  }

  // Calculate age from dateOfBirth
  function getAge(dateString: string) {
    const today = new Date();
    const dob = new Date(dateString);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {/* Show patient photo if present, else fallback */}
        {(() => {
          const photoDoc = patient.documents.find(doc => doc.type === 'photo_id');
          if (photoDoc) {
            return <Avatar src={photoDoc.url} sx={{ width: 64, height: 64, mr: 2 }} />;
          }
          return (
            <Avatar sx={{ width: 64, height: 64, mr: 2, bgcolor: 'primary.100', fontSize: 32 }}>
              <PersonIcon fontSize="inherit" />
            </Avatar>
          );
        })()}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700}>
            {patient.firstName} {patient.lastName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5, flexWrap: 'wrap' }}>
            <Typography variant="subtitle1" color="text.secondary">
              Age: {getAge(patient.dateOfBirth)}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              DOB: {patient.dateOfBirth}
            </Typography>
            <Chip label={(patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : 'Other')} size="small" sx={{ ml: 1 }} />
            <Typography variant="subtitle2" color="text.secondary">
              ID: {patient.id}
            </Typography>
          </Box>
        </Box>
        {/* Add Edit and Delete buttons */}
        <EditPatientButton id={patient.id} />
        <DeletePatientButton id={patient.id} />
      </Box>
{/* // Delete button component (must be outside PatientView) */}
{/* import Button from '@mui/material/Button'; */}
{/* import { useNavigate } from 'react-router-dom'; */}

  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
    {/* Main Info Card */}
  <Box sx={{ flex: '1 1 100%', minWidth: 320, maxWidth: '100%' }}>
          <Card elevation={2} sx={{ borderRadius: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                Personal & Emergency Info
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 50%', minWidth: 200 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography color="text.secondary"><b>Email:</b></Typography>
                  </Box>
                  <Typography sx={{ mb: 1 }}>{patient.email}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography color="text.secondary"><b>Phone:</b></Typography>
                  </Box>
                  <Typography sx={{ mb: 1 }}>{patient.phone}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HomeIcon fontSize="small" color="action" />
                    <Typography color="text.secondary"><b>Address:</b></Typography>
                  </Box>
                  <Typography sx={{ mb: 1 }}>{patient.address.street}, {patient.address.city}, {patient.address.state} {patient.address.zipCode}, {patient.address.country}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography color="text.secondary"><b>Date of Birth:</b></Typography>
                  </Box>
                  <Typography>{patient.dateOfBirth}</Typography>
                </Box>
                <Box sx={{ flex: '1 1 50%', minWidth: 200, background: '#fff7e6', borderRadius: 2, p: 2, boxShadow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <ContactEmergencyIcon fontSize="small" color="warning" />
                    <Typography color="warning.main">Emergency Contact</Typography>
                  </Box>
                  <Typography fontWeight={600}>{patient.emergencyContact.name} ({patient.emergencyContact.relationship})</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography color="text.secondary" fontWeight={500}>Phone:</Typography>
                  </Box>
                  <Typography>{patient.emergencyContact.phone}</Typography>
                  {patient.emergencyContact.email && <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <EmailIcon fontSize="small" color="action" />
                      <Typography color="text.secondary" fontWeight={500}>Email:</Typography>
                    </Box>
                    <Typography>{patient.emergencyContact.email}</Typography>
                  </>}
                </Box>
              </Box>
            </CardContent>
          </Card>
  </Box>
  {/* Medical Info Card */}
  <Box sx={{ flex: '1 1 35%', minWidth: 260, maxWidth: '100%' }}>
          <Card elevation={2} sx={{ borderRadius: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Medical Info</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box>
                  <Typography fontWeight={700} display="inline">Status: </Typography>
                  <Chip label={patient.medicalInfo.status} color={patient.medicalInfo.status === 'active' ? 'success' : patient.medicalInfo.status === 'critical' ? 'error' : 'default'} size="small" sx={{ ml: 1, verticalAlign: 'middle' }} />
                </Box>
                <Typography><b>Blood Type:</b> {patient.medicalInfo.bloodType}</Typography>
                <Typography><b>Allergies:</b> {patient.medicalInfo.allergies.length ? patient.medicalInfo.allergies.join(', ') : 'None'}</Typography>
                <Typography><b>Conditions:</b> {patient.medicalInfo.conditions.length ? patient.medicalInfo.conditions.join(', ') : 'None'}</Typography>
                <Typography><b>Last Visit:</b> {patient.medicalInfo.lastVisit}</Typography>
              </Box>
            </CardContent>
          </Card>
      </Box>
  {/* Insurance Card */}
  <Box sx={{ flex: '1 1 35%', minWidth: 260, maxWidth: '100%' }}>
          <Card elevation={2} sx={{ borderRadius: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Insurance</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography><b>Provider:</b> {patient.insurance.provider}</Typography>
                <Typography><b>Policy #:</b> {patient.insurance.policyNumber}</Typography>
                {patient.insurance.groupNumber && <Typography><b>Group #:</b> {patient.insurance.groupNumber}</Typography>}
                <Typography><b>Copay:</b> ${patient.insurance.copay}</Typography>
                <Typography><b>Deductible:</b> ${patient.insurance.deductible}</Typography>
                <Typography><b>Effective:</b> {patient.insurance.effectiveDate}</Typography>
                {patient.insurance.expirationDate && <Typography><b>Expires:</b> {patient.insurance.expirationDate}</Typography>}
              </Box>
            </CardContent>
          </Card>
      </Box>
  {/* Medications Table */}
  <Box
    sx={{
      width: { xs: '100%', md: '100%' },
      minWidth: 260,
      maxWidth: '100%',
      mt: { xs: 2, md: 2 },
      mb: { xs: 2, md: 0 },
    }}
  >
          <Card elevation={1} sx={{ borderRadius: 3, p: 2, mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Current Medications</Typography>
              <Divider sx={{ mb: 1 }} />
              {patient.medicalInfo.currentMedications.length ? (
                <TableContainer component={Paper} sx={{ boxShadow: 'none', mt: 1 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Dosage</TableCell>
                        <TableCell>Frequency</TableCell>
                        <TableCell>Prescribed By</TableCell>
                        <TableCell>Start</TableCell>
                        <TableCell>Active</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient.medicalInfo.currentMedications.map((med) => (
                        <TableRow key={med.id}>
                          <TableCell>{med.name}</TableCell>
                          <TableCell>{med.dosage}</TableCell>
                          <TableCell>{med.frequency}</TableCell>
                          <TableCell>{med.prescribedBy}</TableCell>
                          <TableCell>{med.startDate}</TableCell>
                          <TableCell>{med.isActive ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" color="default" size="small" />}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography color="text.secondary">No current medications</Typography>
              )}
            </CardContent>
          </Card>
      </Box>
  {/* Documents Table */}
  <Box
    sx={{
      width: { xs: '100%', md: '100%' },
      minWidth: 260,
      maxWidth: '100%',
      mt: { xs: 0, md: 2 },
      mb: { xs: 2, md: 0 },
    }}
  >
          <Card elevation={1} sx={{ borderRadius: 3, p: 2, mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Documents</Typography>
              <Divider sx={{ mb: 1 }} />
              {patient.documents.length ? (
                <TableContainer component={Paper} sx={{ boxShadow: 'none', mt: 1 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Mime</TableCell>
                        <TableCell>Link</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patient.documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>{doc.name}</TableCell>
                          <TableCell>{doc.type.replace('_', ' ')}</TableCell>
                          <TableCell>{doc.uploadDate}</TableCell>
                          <TableCell>{(doc.fileSize / 1024).toFixed(1)} KB</TableCell>
                          <TableCell>{doc.mimeType}</TableCell>
                          <TableCell><a href={doc.url} target="_blank" rel="noopener noreferrer">View</a></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography color="text.secondary">No documents uploaded</Typography>
              )}
            </CardContent>
          </Card>
      </Box>
  </Box>
      <Box sx={{ mt: 4, textAlign: 'right', color: 'text.secondary' }}>
        <Typography variant="caption">Created: {patient.createdAt} | Updated: {patient.updatedAt}</Typography>
      </Box>
    </Box>
  );
}
