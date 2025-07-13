import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type ConfirmDeleteDialogProps = {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
};

export default function ConfirmDeleteDialog({
  open,
  handleClose,
  onConfirm,
  taskTitle,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Delete task?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The
          <Box component="span" sx={{ color: '#000', fontWeight: 'bold' }}>
            &nbsp;{taskTitle}&nbsp;
          </Box>
          task will be permanently deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
