import { Card, CardContent, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueAnalyticsChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue ($M)',
        data: [2.4, 2.8, 3.2, 2.9, 3.5, 3.8],
        backgroundColor: 'rgba(25, 118, 210, 0.8)',
        borderColor: 'rgba(25, 118, 210, 1)',
        borderWidth: 1,
      },
      {
        label: 'Costs ($M)',
        data: [1.8, 2.1, 2.3, 2.2, 2.6, 2.7],
        backgroundColor: 'rgba(244, 67, 54, 0.8)',
        borderColor: 'rgba(244, 67, 54, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: { dataset: { label?: string }; parsed: { y: number } }) {
            return `${context.dataset.label || 'Unknown'}: $${context.parsed.y}M`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number | string) {
            return '$' + value + 'M';
          }
        },
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

  return (
    <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Revenue vs Costs Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monthly financial performance overview
          </Typography>
        </Box>
        <Box sx={{ height: 300 }}>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}