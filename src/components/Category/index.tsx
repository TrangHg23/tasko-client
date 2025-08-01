import {
  useAddCategory,
  useCategories,
  useDeleteCategory,
  useUpdateCategory,
} from '@hooks/useCategory';
import {
  Add,
  Category,
  DeleteOutline,
  EditOutlined,
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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import CategoryDialog from './CategoryDialog';
import type { CategoryRequest, ICategory } from '@app-types/category';
import { NavLink } from 'react-router';

export default function CategoryComponent() {
  const [open, setOpen] = useState(true);
  const handleExpand = () => setOpen(!open);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: categories = [] } = useCategories();

  const { mutateAsync: mutateAsyncAdd, isPending: isPendingAdd } = useAddCategory();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateCategory();
  const { mutateAsync: mutateAsyncDelete } = useDeleteCategory();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openOption = Boolean(anchorEl);

  const handleAdd = () => {
    setSelectedCategory(undefined);
    setOpenDialog(true);
  };

  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category);
    setAnchorEl(null);
    setOpenDialog(true);
  };

  const handleSubmit = async (data: CategoryRequest) => {
    if (selectedCategory) {
      const updateData = {
        id: selectedCategory.id,
        category: data,
      };
      await mutateAsyncUpdate(updateData);
    } else {
      await mutateAsyncAdd(data);
    }

    handleCloseOption();
  };

  const handleDelete = (id: string) => {
    mutateAsyncDelete(id);
    handleCloseOption();
  };

  const handleCloseOption = () => {
    setAnchorEl(null);
    setSelectedCategory(undefined);
  };

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>, category: ICategory) => {
    setAnchorEl(e.currentTarget);
    setSelectedCategory(category);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <div>
        <ListItemButton sx={{ py: 0.5, pl: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Stack direction="row">
              <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Categories</Typography>
              <ListItemIcon>
                <Category />
              </ListItemIcon>
            </Stack>
            <div>
              <IconButton size="small" onClick={handleAdd}>
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
              <div key={category.id}>
                <ListItemButton
                  component={NavLink}
                  to={`/category/${category.name}~${category.id}`}
                  sx={{
                    pl: 3,
                    py: { xs: 1, md: 0.5 },
                    '&.active': {
                      backgroundColor: 'primary.main',
                      color: '#fff',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      '& .MuiIconButton-root': { color: 'white' },
                    },
                  }}
                  key={category.id}
                >
                  <ListItemText
                    primary={
                      category.taskCount > 0
                        ? `${category.name} (${category.taskCount})`
                        : `${category.name}`
                    }
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => handleOpenMenu(e, category)}
                    sx={{ p: 0.5 }}
                  >
                    <MoreHoriz />
                  </IconButton>
                </ListItemButton>
              </div>
            ))}
          </List>
        </Collapse>

        <Menu
          id="option-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: isMobile ? 'bottom' : 'top',
            horizontal: 'right',
          }}
          open={openOption}
          onClose={handleCloseOption}
        >
          <MenuItem
            sx={{ '&:hover': { color: 'secondary.main' }, bgcolor: 'background.popup' }}
            onClick={() => {
              if (selectedCategory) handleEdit(selectedCategory);
            }}
          >
            <EditOutlined sx={{ mr: 1 }} />
            <Typography variant="body2">Edit</Typography>
          </MenuItem>
          <MenuItem
            sx={{ '&:hover': { color: 'secondary.main' } }}
            onClick={() => {
              if (selectedCategory) handleDelete(selectedCategory.id);
            }}
          >
            <DeleteOutline sx={{ mr: 1 }} />
            <Typography variant="body2">Delete</Typography>
          </MenuItem>
        </Menu>

        <CategoryDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          initialData={selectedCategory || undefined}
          onSubmit={handleSubmit}
          isPending={isPendingAdd || isPendingUpdate}
          onCloseOption={() => setSelectedCategory(undefined)}
        />
      </div>
    </Box>
  );
}
