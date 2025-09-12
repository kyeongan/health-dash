import NotificationCenter from '../components/NotificationCenter';
import type { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const drawerWidth = 220;

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          HealthDash
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1 }}>
        <ListItem component={Link} to="/" sx={{ borderRadius: 2, mb: 1, cursor: 'pointer' }}>
          <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/patients" sx={{ borderRadius: 2, mb: 1, cursor: 'pointer' }}>
          <ListItemIcon><PeopleIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Patients" />
        </ListItem>
        <ListItem sx={{ borderRadius: 2, mb: 1, opacity: 0.7, pointerEvents: 'none' }}>
          <ListItemIcon><AssignmentIcon color="disabled" /></ListItemIcon>
          <ListItemText primary={<span style={{ color: '#b0b0b0' }}>Medical Records</span>} />
        </ListItem>
        <ListItem component={Link} to="/analytics" sx={{ borderRadius: 2, mb: 1, cursor: 'pointer' }}>
          <ListItemIcon><InsertChartIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem sx={{ borderRadius: 2, mb: 1, opacity: 0.7, pointerEvents: 'none' }}>
          <ListItemIcon><FolderSharedIcon color="disabled" /></ListItemIcon>
          <ListItemText primary={<span style={{ color: '#b0b0b0' }}>Documents</span>} />
        </ListItem>
        <ListItem sx={{ borderRadius: 2, mb: 1, opacity: 0.7, pointerEvents: 'none' }}>
          <ListItemIcon><PaymentIcon color="disabled" /></ListItemIcon>
          <ListItemText primary={<span style={{ color: '#b0b0b0' }}>Billing</span>} />
        </ListItem>
        <Typography variant="overline" sx={{ pl: 2, color: 'text.secondary', mb: 1 }}>Support</Typography>
        <ListItem sx={{ borderRadius: 2, mb: 1, opacity: 0.7, pointerEvents: 'none' }}>
          <ListItemIcon><SupportAgentIcon color="disabled" /></ListItemIcon>
          <ListItemText primary={<span style={{ color: '#b0b0b0' }}>Contact Support</span>} />
        </ListItem>
        <ListItem sx={{ borderRadius: 2, mb: 1, opacity: 0.7, pointerEvents: 'none' }}>
          <ListItemIcon><InfoIcon color="disabled" /></ListItemIcon>
          <ListItemText primary={<span style={{ color: '#b0b0b0' }}>About</span>} />
        </ListItem>
        <ListItem sx={{ borderRadius: 2, mb: 1, opacity: 0.7, pointerEvents: 'none' }}>
          <ListItemIcon><SettingsIcon color="disabled" /></ListItemIcon>
          <ListItemText primary={<span style={{ color: '#b0b0b0' }}>Settings</span>} />
        </ListItem>
      </List>
      <Box sx={{ mt: 'auto', mb: 2 }}>
        <List>
          <ListItem sx={{ borderRadius: 2, mb: 1, cursor: 'pointer' }} onClick={() => {/* TODO: handle logout */}}>
            <ListItemIcon><LogoutIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Health Dash
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', pt: 8, minHeight: 'calc(100vh - 56px - 48px)' }}>
        {/* Sidebar */}
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="sidebar">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
          {children}
        </Box>
  {/* Notification Center */}
  <NotificationCenter />
      </Box>
      <Box
        component="footer"
        sx={{
          p: 3,
          textAlign: 'center',
          bgcolor: 'background.paper',
          borderColor: 'divider',
          mt: 4,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <span style={{ fontWeight: 600, color: '#1976d2' }}>HealthDash</span>
          <span>&copy; {new Date().getFullYear()}</span>
          <span style={{ fontSize: 18, color: '#1976d2' }}>·</span>
          <span>All rights reserved.</span>
        </Typography>
      </Box>
    </Box>
  );
}
