import { useCategories } from '@hooks/useCategory';
import { Category, Inbox, LabelOutlined } from '@mui/icons-material';
import { Menu, MenuItem, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';

interface CategorySubMenuProps {
  anchorEl: HTMLElement | null;
  onCloseMenu: () => void;
  onSelectCategory: (categoryId: string | null, categoryName?: string) => void;
}

export default function CategorySubMenu({
  anchorEl,
  onCloseMenu,
  onSelectCategory,
}: CategorySubMenuProps) {
  const { data: categories } = useCategories();
  const [pendingCategory, setPendingCategory] = useState<{
    id: string | null;
    name?: string;
  } | null>(null);

  useEffect(() => {
    if (!anchorEl && pendingCategory) {
      onSelectCategory(pendingCategory.id, pendingCategory.name);
      setPendingCategory(null);
    }
  }, [anchorEl, pendingCategory, onSelectCategory]);

  const safeCategories = categories?.length ? categories : [];

  return (
    <Menu
      id="moveTask-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={onCloseMenu}
      sx={{ p: 2, mt: 1 }}
      slotProps={{
        paper: {
          sx: {
            width: anchorEl ? anchorEl.offsetWidth + 40 : 'auto',
          },
        },
      }}
    >
      <MenuItem
        sx={{ '&:hover': { color: 'secondary.main' } }}
        onClick={() => {
          setPendingCategory({ id: null });
          onCloseMenu();
        }}
      >
        <Inbox sx={{ mr: 1, color: '#0000008a' }} />
        Inbox
      </MenuItem>

      {safeCategories?.length > 0 && (
        <Stack direction={'row'} spacing={0.5} sx={{ ml: 2, alignItems: 'center' }}>
          <Category sx={{ color: '#0000008a' }} />
          <Typography sx={{ py: 1, fontWeight: 'bold', color: '#00000de' }}>Categories</Typography>
        </Stack>
      )}

      {safeCategories.map((category) => (
        <div key={category.id}>
          <MenuItem
            sx={{ pl: 4, '&:hover': { color: 'secondary.main' } }}
            disableRipple
            onClick={() => {
              setPendingCategory({ id: category.id, name: category.name });
              onCloseMenu();
            }}
          >
            <LabelOutlined sx={{ mr: 1 }} />
            {category.name}
          </MenuItem>
        </div>
      ))}
    </Menu>
  );
}
