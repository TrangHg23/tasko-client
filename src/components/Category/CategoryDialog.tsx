import type { CategoryRequest } from '@app-types/category';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryRequest) => void;
  initialData?: { id?: string; name: string };
  isPending?: boolean;
  onCloseOption: () => void;
}
export default function CategoryDialog({
  open,
  onClose,
  onSubmit,
  initialData,
  isPending,
  onCloseOption,
}: CategoryDialogProps) {
  const handleCloseModal = () => {
    onClose();
    reset();
    onCloseOption();
  };

  const { control, handleSubmit, watch, reset } = useForm<CategoryRequest>();

  const isValid = !!watch('name')?.trim();
  const isDisabled = !isValid || isPending;

  useEffect(() => {
    if (initialData) {
      reset({ name: initialData.name });
    } else {
      reset({ name: '' });
    }
  }, [initialData, open, reset]);

  const handleSubmitDialog = (data: CategoryRequest) => {
    onSubmit(data);
    handleCloseModal();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'background.default',
          },
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>{initialData ? 'Edit category' : 'Add new category'}</DialogTitle>

      <Divider />
      <Box component="form" onSubmit={handleSubmit(handleSubmitDialog)}>
        <DialogContent sx={{ pt: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Name
          </Typography>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Your category"
                {...field}
              />
            )}
          />
        </DialogContent>
        <Divider />

        <DialogActions sx={{ mr: 2, my: 1, gap: 2 }}>
          <Button
            variant="text"
            sx={{ bgcolor: '#eee', color: '#444', minWidth: '5rem', borderRadius: '10px' }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isDisabled}
            sx={{
              minWidth: '5rem',
              borderRadius: '10px',
              bgcolor: isDisabled ? '#bbdefb' : 'primary.main',
              color: '#fff',
              '&.Mui-disabled': {
                bgcolor: '#64b5f6',
                color: '#fff',
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
