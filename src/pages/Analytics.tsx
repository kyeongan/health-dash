import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HealthcareKPIs from '../components/HealthcareKPIs';
import PatientFlowChart from '../components/PatientFlowChart';
import DepartmentUtilizationChart from '../components/DepartmentUtilizationChart';
import RevenueAnalyticsChart from '../components/RevenueAnalyticsChart';
import PatientDemographicsNew from '../components/PatientDemographicsNew';

export default function Analytics() {
  return (
    <Box sx={{ mx: 'auto', md: 2 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary.main">
        Healthcare Analytics Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Real-time insights into patient care, operational efficiency, and financial performance.
      </Typography>
      
      {/* Key Performance Indicators */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Key Performance Indicators
        </Typography>
        <HealthcareKPIs />
      </Box>

      {/* Patient Demographics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Patient Demographics & Status
        </Typography>
        <PatientDemographicsNew />
      </Box>

      {/* Operational Analytics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Operational Analytics
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3
        }}>
          <PatientFlowChart />
          <DepartmentUtilizationChart />
        </Box>
      </Box>

      {/* Financial Analytics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Financial Performance
        </Typography>
        <RevenueAnalyticsChart />
      </Box>
    </Box>
  );
}
