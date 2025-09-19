import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import RefreshIcon from '@mui/icons-material/Refresh';

interface KPIData {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const getTrendIcon = (change: number) => {
  if (change > 0) return <TrendingUpIcon fontSize="small" />;
  if (change < 0) return <TrendingDownIcon fontSize="small" />;
  return <TrendingFlatIcon fontSize="small" />;
};

const getTrendColor = (change: number, isPositiveGood: boolean = true) => {
  if (change === 0) return 'default';
  if (isPositiveGood) {
    return change > 0 ? 'success' : 'error';
  } else {
    return change > 0 ? 'error' : 'success';
  }
};

export default function HealthcareKPIs() {
  const kpiData: KPIData[] = [
    {
      title: 'Patient Satisfaction',
      value: '4.7/5.0',
      change: 2.3,
      changeLabel: '+2.3% vs last month',
      icon: <StarIcon />,
      color: 'success'
    },
    {
      title: 'Average Wait Time',
      value: '18 min',
      change: -15.2,
      changeLabel: '-15.2% vs last month',
      icon: <AccessTimeIcon />,
      color: 'primary'
    },
    {
      title: 'Bed Occupancy Rate',
      value: '87%',
      change: 4.1,
      changeLabel: '+4.1% vs last month',
      icon: <LocalHospitalIcon />,
      color: 'warning'
    },
    {
      title: 'Revenue per Patient',
      value: '$2,847',
      change: 8.7,
      changeLabel: '+8.7% vs last month',
      icon: <AttachMoneyIcon />,
      color: 'success'
    },
    {
      title: 'Readmission Rate',
      value: '6.2%',
      change: -2.1,
      changeLabel: '-2.1% vs last month',
      icon: <RefreshIcon />,
      color: 'error'
    },
    {
      title: 'Daily Active Patients',
      value: '1,247',
      change: 12.5,
      changeLabel: '+12.5% vs last month',
      icon: <PeopleIcon />,
      color: 'primary'
    }
  ];

  return (
    <Box sx={{ 
      display: 'grid',
      gridTemplateColumns: { 
        xs: '1fr', 
        sm: 'repeat(2, 1fr)', 
        md: 'repeat(3, 1fr)' 
      },
      gap: 3
    }}>
      {kpiData.map((kpi, index) => (
        <Card 
          key={index}
          sx={{ 
            height: '100%',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: 3,
              transform: 'translateY(-2px)'
            }
          }}
        >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: `${kpi.color}.main`,
                  color: 'white'
                }}>
                  {kpi.icon}
                </Box>
                <Chip
                  icon={getTrendIcon(kpi.change)}
                  label={Math.abs(kpi.change).toFixed(1) + '%'}
                  size="small"
                  color={getTrendColor(kpi.change, kpi.title !== 'Readmission Rate' && kpi.title !== 'Average Wait Time')}
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
                {kpi.value}
              </Typography>
              
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {kpi.title}
              </Typography>
              
              <Typography variant="caption" color="text.secondary">
                {kpi.changeLabel}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }