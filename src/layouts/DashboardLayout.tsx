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
import ViewListIcon from '@mui/icons-material/ViewList';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 220;

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Helper function to determine if a menu item is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    // For exact path matching, avoid partial matches
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Modern menu item styling
  const getMenuItemSx = (path: string) => ({
    borderRadius: 3,
    mb: 0.5,
    mx: 1,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    ...(isActive(path) ? {
      bgcolor: 'primary.main',
      color: 'white',
      '&:hover': {
        bgcolor: 'primary.dark',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '4px',
        bgcolor: 'primary.light',
      }
    } : {
      '&:hover': {
        bgcolor: 'action.hover',
        transform: 'translateX(4px)',
      }
    })
  });

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.paper',
      borderRight: '1px solid',
      borderColor: 'divider'
    }}>
      <Toolbar sx={{ 
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        color: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
          HealthDash
        </Typography>
      </Toolbar>
      <Divider />
      
      <List sx={{ flex: 1, py: 2 }}>
        {/* Main Navigation */}
        <ListItem component={Link} to="/" sx={getMenuItemSx('/')}>
          <ListItemIcon sx={{ color: isActive('/') ? 'inherit' : 'primary.main', minWidth: 40 }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Dashboard" 
            primaryTypographyProps={{ 
              fontWeight: isActive('/') ? 600 : 500,
              fontSize: '0.95rem'
            }} 
          />
        </ListItem>
        
        <ListItem component={Link} to="/patients" sx={getMenuItemSx('/patients')}>
          <ListItemIcon sx={{ color: isActive('/patients') ? 'inherit' : 'primary.main', minWidth: 40 }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Patients" 
            primaryTypographyProps={{ 
              fontWeight: isActive('/patients') ? 600 : 500,
              fontSize: '0.95rem'
            }} 
          />
        </ListItem>
        
        <ListItem component={Link} to="/patients-scroll" sx={getMenuItemSx('/patients-scroll')}>
          <ListItemIcon sx={{ color: isActive('/patients-scroll') ? 'inherit' : 'primary.main', minWidth: 40 }}>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Patients List" 
            primaryTypographyProps={{ 
              fontWeight: isActive('/patients-scroll') ? 600 : 500,
              fontSize: '0.95rem'
            }} 
          />
        </ListItem>
        
        <ListItem sx={{ 
          borderRadius: 3, mb: 0.5, mx: 1, opacity: 0.6, 
          pointerEvents: 'none',
          transition: 'all 0.2s ease-in-out'
        }}>
          <ListItemIcon sx={{ color: 'text.disabled', minWidth: 40 }}>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Medical Records" 
            primaryTypographyProps={{ 
              color: 'text.disabled',
              fontSize: '0.95rem'
            }} 
          />
        </ListItem>
        
        <ListItem component={Link} to="/analytics" sx={getMenuItemSx('/analytics')}>
          <ListItemIcon sx={{ color: isActive('/analytics') ? 'inherit' : 'primary.main', minWidth: 40 }}>
            <InsertChartIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Analytics" 
            primaryTypographyProps={{ 
              fontWeight: isActive('/analytics') ? 600 : 500,
              fontSize: '0.95rem'
            }} 
          />
        </ListItem>
        
        {/* Disabled Items */}
        <ListItem sx={{ 
          borderRadius: 3, mb: 0.5, mx: 1, opacity: 0.6, 
          pointerEvents: 'none',
          transition: 'all 0.2s ease-in-out'
        }}>
          <ListItemIcon sx={{ color: 'text.disabled', minWidth: 40 }}>
            <FolderSharedIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Documents" 
            primaryTypographyProps={{ 
              color: 'text.disabled',
              fontSize: '0.95rem'
            }} 
          />
        </ListItem>
        
        <ListItem sx={{ 
          borderRadius: 3, mb: 0.5, mx: 1, opacity: 0.6, 
          pointerEvents: 'none',
          transition: 'all 0.2s ease-in-out'
        }}>
          <ListItemIcon sx={{ color: 'text.disabled', minWidth: 40 }}>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Billing" 
            primaryTypographyProps={{ 
              color: 'text.disabled',
              fontSize: '0.95rem'
            }} 
          />
        </ListItem>
        
        {/* Support Section */}
        <Typography 
          variant="overline" 
          sx={{ 
            pl: 3, 
            pt: 3, 
            pb: 1,
            color: 'text.secondary', 
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: 1
          }}
        >
          Support
        </Typography>
        
        <ListItem sx={{ 
          borderRadius: 3, mb: 0.5, mx: 1, opacity: 0.6, 
          pointerEvents: 'none',
          transition: 'all 0.2s ease-in-out'
        }}>
          <ListItemIcon sx={{ color: 'text.disabled', minWidth: 40 }}>
            <SupportAgentIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Contact Support" 
            primaryTypographyProps={{ 
              color: 'text.disabled',
              fontSize: '0.95rem'
            }} 
          />
        </ListItem>
        
        <ListItem sx={{ 
          borderRadius: 3, mb: 0.5, mx: 1, opacity: 0.6, 
          pointerEvents: 'none',
          transition: 'all 0.2s ease-in-out'
        }}>
          <ListItemIcon sx={{ color: 'text.disabled', minWidth: 40 }}>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText 
            primary="About" 
            primaryTypographyProps={{ 
              color: 'text.disabled',
              fontSize: '0.95rem'
            }} 
          />
        </ListItem>
        
        <ListItem sx={{ 
          borderRadius: 3, mb: 0.5, mx: 1, opacity: 0.6, 
          pointerEvents: 'none',
          transition: 'all 0.2s ease-in-out'
        }}>
          <ListItemIcon sx={{ color: 'text.disabled', minWidth: 40 }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Settings" 
            primaryTypographyProps={{ 
              color: 'text.disabled',
              fontSize: '0.95rem'
            }} 
          />
        </ListItem>
      </List>
      
      {/* Logout Section */}
      <Box sx={{ mt: 'auto', mb: 2, px: 1 }}>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem 
            sx={{ 
              borderRadius: 3, 
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'error.light',
                color: 'error.contrastText',
                transform: 'translateX(4px)',
              }
            }} 
            onClick={() => {/* TODO: handle logout */}}
          >
            <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                fontSize: '0.95rem',
                color: 'error.main'
              }} 
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              fontWeight: 700, 
              letterSpacing: 0.5,
              background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
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
            sx={{ 
              display: { xs: 'block', sm: 'none' }, 
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                borderRight: 'none',
                boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
              } 
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{ 
              display: { xs: 'none', sm: 'block' }, 
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                borderRight: 'none',
                boxShadow: '4px 0 20px rgba(0,0,0,0.05)',
                bgcolor: 'background.paper',
              } 
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {/* Main content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            width: '100%',
            bgcolor: 'grey.50',
            minHeight: 'calc(100vh - 120px)',
            borderRadius: { sm: '20px 0 0 0' },
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(25,118,210,0.2) 50%, transparent 100%)',
            }
          }}
        >
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
