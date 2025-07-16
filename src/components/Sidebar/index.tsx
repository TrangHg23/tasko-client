import CategoryComponent from '@components/Category';
import UserMenu from '@components/UserMenu';
import { useCountTask } from '@hooks/useTask';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router';
import { navItems } from 'src/constants/navItems';

type SidebarProps = {
  handleClose: () => void;
  isMobile: boolean;
};
function Sidebar({ handleClose, isMobile }: SidebarProps) {
  const { data: taskCount } = useCountTask();
  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
        <UserMenu />

        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={NavLink}
              to={item.to}
              onClick={isMobile ? handleClose : undefined}
              sx={{
                '&.active': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  item.showCount && taskCount?.[item.key] > 0
                    ? `${item.label} (${taskCount[item.key]})`
                    : item.label
                }
              />
            </ListItemButton>
          ))}
          <CategoryComponent />
        </List>
      </Box>
    </>
  );
}

export default Sidebar;
