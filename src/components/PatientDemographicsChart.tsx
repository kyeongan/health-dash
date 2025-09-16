import { PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';
import { getPatients } from '../services/api';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
}

const COLORS = ['#1976d2', '#e57373', '#ffd600', '#64b5f6', '#81c784'];

function getAge(dob: string) {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function getAgeGroup(age: number) {
  if (age < 18) return '<18';
  if (age < 30) return '18-29';
  if (age < 45) return '30-44';
  if (age < 65) return '45-64';
  return '65+';
}


export default function PatientDemographicsChart() {
  const [genderData, setGenderData] = useState<{ name: string; value: number }[]>([]);
  const [ageData, setAgeData] = useState<{ group: string; count: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPatients()
      .then((patients: Patient[]) => {
        // Gender
        const genderCounts: Record<string, number> = {};
        // Age group
        const ageCounts: Record<string, number> = {};
        patients.forEach((p) => {
          const g = p.gender || 'Unknown';
          genderCounts[g] = (genderCounts[g] || 0) + 1;
          const age = getAge(p.dateOfBirth);
          const group = getAgeGroup(age);
          ageCounts[group] = (ageCounts[group] || 0) + 1;
        });
        setGenderData(
          Object.entries(genderCounts).map(([name, value]) => ({ name, value }))
        );
        setAgeData(
          Object.entries(ageCounts).map(([group, count]) => ({ group, count }))
        );
        setError(null);
      })
      .catch(() => {
        setError('Unable to load analytics data. Please check your network or try again later.');
        setGenderData([]);
        setAgeData([]);
      });
  }, []);

  // Custom label for gender pie chart (percentage inside)
  // TODO: Type props for renderGenderLabel more strictly if possible
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderGenderLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Patient Demographics
      </Typography>
      {error ? (
        <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
          <Typography variant="body1">{error}</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography variant="subtitle1" align="center" gutterBottom>Gender</Typography>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={renderGenderLabel}
                  labelLine={false}
                >
                  {genderData.map((_, idx) => (
                    <Cell key={`cell-gender-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Typography variant="subtitle1" align="center" gutterBottom>Age Group</Typography>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ageData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <XAxis dataKey="group" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      )}
    </Paper>
  );
}
