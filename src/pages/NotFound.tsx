import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5">Page Not Found</Typography>
    </Box>
  );
}
