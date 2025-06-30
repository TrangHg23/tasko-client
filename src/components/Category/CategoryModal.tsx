import type { CategoryRequest } from '@app-types/auth';
import { useAddCategory } from '@hooks/useCategory';
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';

type CategoryModal = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function CategoryModal({ open, setOpen }: CategoryModal) {
  const handleCloseModal = () => {
    setOpen(false);
    reset();
  };

  const { mutateAsync, isPending } = useAddCategory();

  const { control, handleSubmit, watch, reset } = useForm<CategoryRequest>();

  const isValid = !!watch('name')?.trim();
  const isDisabled = !isValid || isPending;

  const handleCreateCategory = async (data: CategoryRequest) => {
    try {
      await mutateAsync(data);
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.default',
    width: 400,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Paper sx={style}>
        <Typography id="add-category" variant="h6" sx={{ fontWeight: '600' }}>
          Add new category
        </Typography>
        <Box sx={{ mt: 2 }} component="form" onSubmit={handleSubmit(handleCreateCategory)}>
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
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <Stack direction="row" justifyContent={'flex-end'} mt={3} spacing={2}>
            <Button
              variant="contained"
              sx={{ bgcolor: '#f5f5f5', color: '#444' }}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isDisabled}
              sx={{
                backgroundColor: isDisabled ? '#bbdefb' : 'primary.main',
                color: '#fff',
                '&.Mui-disabled': {
                  backgroundColor: '#64b5f6',
                  color: '#fff',
                },
              }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Modal>
  );
}
