import UserMenu from '@components/UserMenu';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router';
import { navItems } from 'src/constants/navItems';

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 300,
        backgroundColor: 'background.default',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 300,
        },
      }}
    >
      <UserMenu />

      <List sx={{ mx: 2 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.to}
            sx={{
              borderRadius: 2,
              '&.active': {
                backgroundColor: 'primary.main',
                color: 'white',
                '& .MuiListItemIcon-root': { color: 'white' },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              slotProps={{
                primary: {
                  variant: 'body2',
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
