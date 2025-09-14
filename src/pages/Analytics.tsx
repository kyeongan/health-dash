import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PatientDemographicsChart from '../components/PatientDemographicsChart';

export default function Analytics() {
  return (
    <Box sx={{ mx: 'auto', md: 2 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary.main">
        Analytics
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Explore patient demographics and trends.
      </Typography>
      <PatientDemographicsChart />
      {/* Add more charts here as needed */}
    </Box>
  );
}
