import { useState, useMemo, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { patients } from '../mocks/patients';

export default function PatientListScroll() {
  const [search, setSearch] = useState('');
  const [displayCount, setDisplayCount] = useState(50); // Start with 50 patients
  const [loading, setLoading] = useState(false);
  const itemsPerLoad = 50; // Load 50 more items each time
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

  // Filter patients based on search
  const filteredPatients = useMemo(() => {
    if (!search) return patients;
    return patients.filter(patient =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Get the patients to display (filtered + limited by displayCount)
  const displayedPatients = useMemo(() => {
    return filteredPatients.slice(0, displayCount);
  }, [filteredPatients, displayCount]);

  // Load more patients function
  const loadMorePatients = useCallback(() => {
    if (loading || displayCount >= filteredPatients.length) return;
    
    setLoading(true);
    // Simulate loading delay (in real app, this might be an API call)
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + itemsPerLoad, filteredPatients.length));
      setLoading(false);
    }, 500);
  }, [loading, displayCount, filteredPatients.length, itemsPerLoad]);

  // Infinite scroll handler
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const threshold = 100; // Load more when 100px from bottom
    
    if (scrollHeight - scrollTop - clientHeight < threshold) {
      loadMorePatients();
    }
  }, [loadMorePatients]);

  // Reset display count when search changes
  useEffect(() => {
    setDisplayCount(itemsPerLoad);
  }, [search, itemsPerLoad]);

  const hasMoreToLoad = displayCount < filteredPatients.length;

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, p: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="primary.main">
            Patients - Infinite Scroll ({patients.length} total)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Showing {displayedPatients.length} of {filteredPatients.length} {search ? 'filtered ' : ''}patients
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
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Patient List with Infinite Scroll */}
      <Paper sx={{ flex: 1, mx: 2, mb: 2, overflow: 'auto' }}>
        {displayedPatients.length > 0 ? (
          <Box onScroll={handleScroll} sx={{ height: '100%', overflow: 'auto' }}>
            <List dense>
              {displayedPatients.map((patient) => (
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
              
              {/* Loading indicator */}
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={24} />
                  <Typography variant="body2" sx={{ ml: 1, alignSelf: 'center' }}>
                    Loading more patients...
                  </Typography>
                </Box>
              )}
              
              {/* Load more button (fallback for manual loading) */}
              {!loading && hasMoreToLoad && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <Button variant="outlined" onClick={loadMorePatients}>
                    Load More ({filteredPatients.length - displayCount} remaining)
                  </Button>
                </Box>
              )}
              
              {/* End of list indicator */}
              {!hasMoreToLoad && filteredPatients.length > itemsPerLoad && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    End of patient list
                  </Typography>
                </Box>
              )}
            </List>
          </Box>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              {search ? 'No patients found matching your search' : 'No patients available'}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}