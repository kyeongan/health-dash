import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useAppStore } from '../store/appStore';
import type { Patient } from '../types/patient';
import { useNavigate } from 'react-router-dom';
export default function PatientList() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState<'name' | 'age' | 'lastVisit' | 'status'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const addNotification = useAppStore((s) => s.addNotification);
  useEffect(() => {
    fetch('http://localhost:8000/patients')
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            addNotification({ message: 'Permission denied (not authorized)', type: 'error' });
          } else {
            addNotification({ message: `Network error: ${res.statusText}`, type: 'error' });
          }
          setLoading(false);
          return Promise.reject();
        }
        return res.json();
      })
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch(() => {
        addNotification({ message: 'Network error: Could not connect to server', type: 'error' });
        setLoading(false);
      });
  }, [addNotification]);

  const filtered = patients.filter((p) =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortBy === 'name') {
      cmp = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    } else if (sortBy === 'age') {
      cmp = getAge(a.dateOfBirth) - getAge(b.dateOfBirth);
    } else if (sortBy === 'lastVisit') {
      cmp = new Date(a.medicalInfo.lastVisit).getTime() - new Date(b.medicalInfo.lastVisit).getTime();
    } else if (sortBy === 'status') {
      cmp = a.medicalInfo.status.localeCompare(b.medicalInfo.status);
    }
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const handleSort = (col: typeof sortBy) => {
    if (sortBy === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDir('asc');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="primary.main">
          Patients
        </Typography>
        <Button variant="contained" onClick={() => navigate('/patients/new')}>
          Add Patient
        </Button>
      </Box>
      <TextField
        label="Search patients"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  onClick={() => handleSort('name')}
                  sx={{ cursor: 'pointer', fontWeight: sortBy === 'name' ? 700 : 400 }}
                >
                  Name {sortBy === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell
                  onClick={() => handleSort('age')}
                  sx={{ cursor: 'pointer', fontWeight: sortBy === 'age' ? 700 : 400 }}
                >
                  Age {sortBy === 'age' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell
                  onClick={() => handleSort('lastVisit')}
                  sx={{ cursor: 'pointer', fontWeight: sortBy === 'lastVisit' ? 700 : 400 }}
                >
                  Last Visit {sortBy === 'lastVisit' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
                <TableCell
                  onClick={() => handleSort('status')}
                  sx={{ cursor: 'pointer', fontWeight: sortBy === 'status' ? 700 : 400 }}
                >
                  Status {sortBy === 'status' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>
              ) : (
                sorted
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((p: Patient) => (
                    <TableRow
                      key={p.id}
                      hover
                      sx={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/patients/${p.id}`)}
                    >
                      <TableCell>{p.firstName} {p.lastName}</TableCell>
                      <TableCell>{getAge(p.dateOfBirth)}</TableCell>
                      <TableCell>{p.medicalInfo.lastVisit}</TableCell>
                      <TableCell>{p.medicalInfo.status}</TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>


    </Box>
  );
}

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
