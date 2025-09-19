import { Card, CardContent, Typography, Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DepartmentUtilizationChart() {
  const data = {
    labels: ['Emergency', 'ICU', 'Surgery', 'Cardiology', 'Oncology', 'Pediatrics'],
    datasets: [
      {
        data: [28, 22, 18, 15, 12, 5],
        backgroundColor: [
          '#ff6b6b',
          '#4ecdc4', 
          '#45b7d1',
          '#96ceb4',
          '#ffeaa7',
          '#dda0dd',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: { label: string; parsed: number }) {
            return `${context.label}: ${context.parsed}% capacity`;
          }
        }
      }
    },
  };

  return (
    <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Department Utilization
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current capacity usage by department
          </Typography>
        </Box>
        <Box sx={{ height: 300 }}>
          <Doughnut data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}