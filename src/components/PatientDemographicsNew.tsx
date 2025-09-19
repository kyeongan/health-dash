import { Card, CardContent, Typography, Box } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import { patients } from '../mocks/patients';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function PatientDemographicsChart() {
  // Analyze patient data to create meaningful charts
  const ageGroups = {
    '0-18': 0,
    '19-35': 0,
    '36-50': 0,
    '51-65': 0,
    '66+': 0
  };

  const genderDistribution = {
    male: 0,
    female: 0,
    other: 0
  };

  const statusDistribution = {
    active: 0,
    inactive: 0,
    critical: 0
  };

  // Analyze the patient data
  patients.forEach(patient => {
    // Calculate age
    const birthYear = new Date(patient.dateOfBirth).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    // Categorize by age group
    if (age <= 18) ageGroups['0-18']++;
    else if (age <= 35) ageGroups['19-35']++;
    else if (age <= 50) ageGroups['36-50']++;
    else if (age <= 65) ageGroups['51-65']++;
    else ageGroups['66+']++;

    // Count gender distribution
    genderDistribution[patient.gender]++;

    // Count status distribution
    statusDistribution[patient.medicalInfo.status]++;
  });

  const ageData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: 'Number of Patients',
        data: Object.values(ageGroups),
        backgroundColor: [
          'rgba(255, 107, 107, 0.8)',
          'rgba(78, 205, 196, 0.8)',
          'rgba(69, 183, 209, 0.8)',
          'rgba(150, 206, 180, 0.8)',
          'rgba(255, 234, 167, 0.8)',
        ],
        borderColor: [
          'rgba(255, 107, 107, 1)',
          'rgba(78, 205, 196, 1)',
          'rgba(69, 183, 209, 1)',
          'rgba(150, 206, 180, 1)',
          'rgba(255, 234, 167, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const genderData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        data: [genderDistribution.male, genderDistribution.female, genderDistribution.other],
        backgroundColor: [
          'rgba(25, 118, 210, 0.8)',
          'rgba(233, 30, 99, 0.8)',
          'rgba(156, 39, 176, 0.8)',
        ],
        borderColor: [
          'rgba(25, 118, 210, 1)',
          'rgba(233, 30, 99, 1)',
          'rgba(156, 39, 176, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const statusData = {
    labels: ['Active', 'Inactive', 'Critical'],
    datasets: [
      {
        label: 'Patient Count',
        data: [statusDistribution.active, statusDistribution.inactive, statusDistribution.critical],
        backgroundColor: [
          'rgba(76, 175, 80, 0.8)',
          'rgba(158, 158, 158, 0.8)',
          'rgba(244, 67, 54, 0.8)',
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(158, 158, 158, 1)',
          'rgba(244, 67, 54, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <Box sx={{ 
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
      gap: 3
    }}>
      <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Patient Age Distribution
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current patient population by age groups
            </Typography>
          </Box>
          <Box sx={{ height: 250 }}>
            <Bar data={ageData} options={barOptions} />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Gender Distribution
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Patient demographics by gender
            </Typography>
          </Box>
          <Box sx={{ height: 250 }}>
            <Doughnut data={genderData} options={doughnutOptions} />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Patient Status Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current patient status distribution
            </Typography>
          </Box>
          <Box sx={{ height: 250 }}>
            <Bar data={statusData} options={barOptions} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}