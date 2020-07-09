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
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
