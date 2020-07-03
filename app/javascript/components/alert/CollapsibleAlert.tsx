import React from "react";
import { Collapse, IconButton, makeStyles, Theme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import { CollapsibleAlertProps } from "../../common/types";

const useStyles = makeStyles((theme: Theme) => ({
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

const CollapsibleAlert: React.FC<CollapsibleAlertProps> = ({
  message,
  closeAlert,
  severity,
  showAlert,
}) => {
  const classes = useStyles();

  return (
    <Collapse in={showAlert}>
      <Alert
        severity={severity}
        className={classes.alert}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              closeAlert();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default CollapsibleAlert;
