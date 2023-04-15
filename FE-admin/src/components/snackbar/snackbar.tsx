import { makeStyles } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import SnackBar from "@material-ui/core/Snackbar";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "120px",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    boxShadow: "0px 0px 20px #00000033",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface SnackbarProps {
  isOpenSnackbar: boolean;
  isError: boolean;
  message: string;
  handleCloseSnackBar: () => void;
}

export function Snackbar({ isError, isOpenSnackbar, message, handleCloseSnackBar }: SnackbarProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    handleCloseSnackBar();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(isOpenSnackbar);
  }, [isOpenSnackbar]);

  return (
    <div className={`${classes.root} ${isError ? "" : ""} z-20`}>
      <SnackBar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </SnackBar>
    </div>
  );
}
