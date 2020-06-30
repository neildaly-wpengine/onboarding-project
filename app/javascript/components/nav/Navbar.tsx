import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { NavbarProps, ConsumerProps } from "../../common/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    bar: {
      backgroundColor: theme.palette.primary.main,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
      color: "#fff",
    },
  })
);

const Navbar: React.FC<NavbarProps & ConsumerProps> = ({
  authenticated,
  consumer,
}) => {
  const classes = useStyles();

  const handleLogout = (e: React.BaseSyntheticEvent): void => {
    console.log(e);
  };

  const logoutJSX: JSX.Element | null = authenticated ? (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  ) : null;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Bloggy
            </Link>
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">
            <Link to="/register" className={classes.link}>
              Register
            </Link>
          </Button>
          {logoutJSX}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
