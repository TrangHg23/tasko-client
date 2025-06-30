import { useCategories } from '@hooks/useCategory';
import {
  Add,
  Category,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
  MoreHoriz,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import CategoryModal from './CategoryModal';

export default function CategoryComponent() {
  const [open, setOpen] = useState(true);
  const handleExpand = () => setOpen(!open);

  const { data: categories = [] } = useCategories();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openOption = Boolean(anchorEl);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const handleDelete = () => {};

  const handleCloseOption = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => {
    setAnchorEl(e.currentTarget);
    setSelectedId(id);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <div>
        <ListItemButton disableRipple>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Stack direction="row">
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
                Categories
              </Typography>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
            </Stack>
            <div>
              <IconButton size="small" onClick={handleOpenModal}>
                <Add />
              </IconButton>
              <IconButton size="small" onClick={handleExpand}>
                {open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </div>
          </Stack>
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories?.map((category) => (
              <ListItemButton sx={{ pl: 4 }} key={category.id} disableRipple>
                <ListItemText primary={category.name} />
                <IconButton
                  onClick={(e) => handleOpenMenu(e, category.id)}
                  sx={{
                    color: selectedId === category.id ? 'primary.main' : 'gray',
                  }}
                >
                  <MoreHoriz />
                </IconButton>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <Menu
          id="option-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openOption}
          onClose={handleCloseOption}
        >
          <MenuItem sx={{ '&:hover': { color: 'secondary.main' }, bgcolor: 'background.popup' }}>
            <Edit sx={{ mr: 1 }} fontSize="small" />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ '&:hover': { color: 'secondary.main' } }}>
            <Delete sx={{ mr: 1 }} fontSize="small" />
            Delete
          </MenuItem>
        </Menu>
        <CategoryModal open={openModal} setOpen={setOpenModal} />
      </div>
    </Box>
  );
}
