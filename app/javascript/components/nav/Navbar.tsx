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
import { Link, useHistory } from "react-router-dom";
import {
  ConsumerProps,
  NotifyAuthProps,
  NavbarProps,
} from "../../common/types";

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

const Navbar: React.FC<NavbarProps & ConsumerProps & NotifyAuthProps> = ({
  authenticated,
  consumer,
  toggleAuthentication,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = async () => {
    const response = await consumer.destroySession();

    if (response.data.loggedOut) {
      toggleAuthentication();
      history.push("/");
    }
  };

  const toolbarJSX: JSX.Element | null = authenticated ? (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <React.Fragment>
      <Button color="inherit">Login</Button>
      <Button color="inherit">
        <Link to="/register" className={classes.link}>
          Register
        </Link>
      </Button>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Bloggy
            </Link>
          </Typography>
          {toolbarJSX}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
