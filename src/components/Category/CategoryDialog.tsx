import type { CategoryRequest } from '@app-types/category';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
    console.log(data);
    onSubmit(data);
    handleCloseModal();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'background.default',
          },
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {initialData ? 'Edit category' : 'Add new category'}
        </Typography>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit(handleSubmitDialog)}>
        <DialogContent sx={{ pt: 0 }}>
          <Typography sx={{ mb: 1 }}>Name</Typography>
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

        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button
            variant="contained"
            sx={{ bgcolor: '#eee', color: '#444' }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isDisabled}
            sx={{
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
