import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: 4,
        boxShadow: 2,
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 6 },
        mt: 4,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <LocalHospitalIcon sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />
        <Typography variant="h3" fontWeight={700} gutterBottom color="primary.main">
          Health Dash
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Modern Healthcare Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
          Manage patients, view analytics, and streamline your healthcare workflow with a beautiful, intuitive dashboard.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
          maxWidth: 900,
          mb: 4,
        }}
      >
        <Link
          component={RouterLink}
          to="/patients"
          underline="none"
          sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 28%' }, minWidth: 220, p: 3, bgcolor: 'white', borderRadius: 3, boxShadow: 1, textAlign: 'center', height: '100%', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4, bgcolor: '#f0f4fa' } }}
        >
          <GroupIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
          <Typography fontWeight={600} gutterBottom>Patient Management</Typography>
          <Typography variant="body2" color="text.secondary">
            Add, edit, and view patient records with ease.
          </Typography>
        </Link>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 28%' }, minWidth: 220, p: 3, bgcolor: 'white', borderRadius: 3, boxShadow: 1, textAlign: 'center', height: '100%', opacity: 0.6 }}>
          <AssignmentIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
          <Typography fontWeight={600} gutterBottom>Medical Records</Typography>
          <Typography variant="body2" color="text.secondary">
            Securely store and access medical documents.
          </Typography>
        </Box>
        <Link
          component={RouterLink}
          to="/analytics"
          underline="none"
          sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 28%' }, minWidth: 220, p: 3, bgcolor: 'white', borderRadius: 3, boxShadow: 1, textAlign: 'center', height: '100%', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4, bgcolor: '#f0f4fa' } }}
        >
          <InsertChartIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
          <Typography fontWeight={600} gutterBottom>Analytics</Typography>
          <Typography variant="body2" color="text.secondary">
            Visualize trends and key metrics at a glance.
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}
