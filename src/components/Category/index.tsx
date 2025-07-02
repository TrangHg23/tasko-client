import {
  useAddCategory,
  useCategories,
  useDeleteCategory,
  useUpdateCategory,
} from '@hooks/useCategory';
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
import CategoryDialog from './CategoryDialog';
import type { CategoryRequest, ICategory } from '@app-types/category';

export default function CategoryComponent() {
  const [open, setOpen] = useState(true);
  const handleExpand = () => setOpen(!open);

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
                <ListItemButton sx={{ pl: 4 }} key={category.id} disableRipple>
                  <ListItemText primary={category.name} />
                  <IconButton
                    onClick={(e) => handleOpenMenu(e, category)}
                    sx={{
                      color: selectedCategory?.id === category.id ? 'primary.main' : 'gray',
                    }}
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
            vertical: 'top',
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
            <Edit sx={{ mr: 1 }} fontSize="small" />
            Edit
          </MenuItem>
          <MenuItem
            sx={{ '&:hover': { color: 'secondary.main' } }}
            onClick={() => {
              if (selectedCategory) handleDelete(selectedCategory.id);
            }}
          >
            <Delete sx={{ mr: 1 }} fontSize="small" />
            Delete
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
