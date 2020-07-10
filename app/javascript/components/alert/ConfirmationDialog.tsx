import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";

interface ConfirmationDialogProps {
  open: boolean;
  handleCancel(): void;
  handleOk(): void;
  title: string;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  handleCancel,
  handleOk,
  title,
  message,
}) => {
  return (
    <Dialog
      data-testid="delete-dialog"
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" data-testid="dialog-message">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleCancel}
          color="primary"
          data-testid="dialog-cancel"
        >
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary" data-testid="dialog-ok">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
