import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppStore } from '../store/appStore';

export default function NotificationCenter() {
  const notifications = useAppStore((s) => s.notifications);
  const removeNotification = useAppStore((s) => s.removeNotification);

  return (
    <>
      {notifications.map((n) => (
        <Snackbar
          key={n.id}
          open
          autoHideDuration={4000}
          onClose={() => removeNotification(n.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={n.type} onClose={() => removeNotification(n.id)} sx={{ width: '100%' }}>
            {n.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
