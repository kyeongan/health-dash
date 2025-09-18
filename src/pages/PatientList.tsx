import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import { patients } from '../mocks/patients';

export default function PatientList() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  const getAge = (dob: string) => {
    const birth = new Date(dob);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Filter and paginate patients
  const { paginatedPatients, totalPages, allFilteredPatients } = useMemo(() => {
    let filtered;
    if (!search) {
      filtered = patients;
    } else {
      filtered = patients.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);
    const pages = Math.ceil(filtered.length / itemsPerPage);
    
    return {
      paginatedPatients: paginated,
      totalPages: pages,
      allFilteredPatients: filtered
    };
  }, [search, page, itemsPerPage]);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, p: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="primary.main">
            Patients ({patients.length} total)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Showing {((page - 1) * itemsPerPage) + 1}-{Math.min(page * itemsPerPage, allFilteredPatients.length)} of {allFilteredPatients.length} {search ? 'filtered ' : ''}patients
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => navigate('/patients/new')}>
          Add Patient
        </Button>
      </Box>

      {/* Search */}
      <Box sx={{ px: 2, mb: 2 }}>
        <TextField
          label="Search patients"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset to first page when searching
          }}
        />
      </Box>

      {/* Patient List */}
      <Paper sx={{ flex: 1, mx: 2, mb: 2, overflow: 'auto' }}>
        {paginatedPatients.length > 0 ? (
          <List dense>
            {paginatedPatients.map((patient) => (
              <ListItem
                key={patient.id}
                disablePadding
                sx={{ borderBottom: '1px solid #e0e0e0' }}
              >
                <ListItemButton
                  onClick={() => navigate(`/patients/${patient.id}`)}
                  sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <ListItemText
                    primary={`${patient.firstName} ${patient.lastName}`}
                    secondary={`Age: ${getAge(patient.dateOfBirth)} • Last Visit: ${patient.medicalInfo.lastVisit} • Status: ${patient.medicalInfo.status}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              {search ? 'No patients found matching your search' : 'No patients available'}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
}
