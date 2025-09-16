import { useEffect, useState } from 'react';
import { useAppStore } from '../store/appStore';
import { getPatients } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const COLORS = ['#1976d2', '#e57373', '#ffd600', '#64b5f6', '#81c784', '#ba68c8', '#ff8a65', '#4db6ac'];

interface Patient {
  insurance: { provider: string };
  medicalInfo: { conditions: string[] };
}


export default function PatientAnalyticsCharts() {
  const [diagnosisData, setDiagnosisData] = useState<{ name: string; count: number }[]>([]);
  const [insuranceData, setInsuranceData] = useState<{ name: string; value: number }[]>([]);
  // Removed unused error state; notification is now used for errors.
  const addNotification = useAppStore((s) => s.addNotification);

  useEffect(() => {
    getPatients()
      .then((patients: Patient[]) => {
        // Top Diagnoses
        const diagCounts: Record<string, number> = {};
        patients.forEach((p) => {
          (p.medicalInfo.conditions || []).forEach((cond) => {
            diagCounts[cond] = (diagCounts[cond] || 0) + 1;
          });
        });
        const diagArr = Object.entries(diagCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8); // Top 8
        setDiagnosisData(diagArr);

        // Insurance Providers
        const insCounts: Record<string, number> = {};
        patients.forEach((p) => {
          const provider = p.insurance?.provider || 'Unknown';
          insCounts[provider] = (insCounts[provider] || 0) + 1;
        });
        setInsuranceData(
          Object.entries(insCounts).map(([name, value]) => ({ name, value }))
        );
      })
      .catch(() => {
        addNotification({ message: 'Network error: Could not connect to server', type: 'error' });
        setDiagnosisData([]);
        setInsuranceData([]);
      });
  }, [addNotification]);

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, my: 2 }}>
      <Paper sx={{ flex: 1, p: 2 }}>
        <Typography variant="subtitle1" align="center" gutterBottom>Top Diagnoses</Typography>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={diagnosisData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={60} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#1976d2" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Paper sx={{ flex: 1, p: 2 }}>
        <Typography variant="subtitle1" align="center" gutterBottom>Insurance Providers</Typography>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={insuranceData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={(props: any) => {
                const { name, percent } = props;
                return `${name}: ${(percent * 100).toFixed(0)}%`;
              }}
              labelLine={false}
            >
              {insuranceData.map((_, idx) => (
                <Cell key={`cell-ins-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
