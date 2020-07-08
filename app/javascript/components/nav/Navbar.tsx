import {
  AppBar,
  Avatar,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { NavbarProps } from "../../common/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    bar: {
      backgroundColor: theme.palette.primary.main,
      minHeight: "5vh",
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
    avatar: {
      color: "#fff",
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

const Navbar: React.FC<NavbarProps> = ({
  authenticated,
  consumer,
  notifyLogout,
  userInitials,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = async () => {
    const response = await consumer.destroySession();
    setAnchorEl(null);

    if (response.data.loggedOut) {
      notifyLogout();
      history.push("/");
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toolbarJSX: JSX.Element | null = authenticated ? (
    <React.Fragment>
      <IconButton>
        <Avatar className={classes.avatar} onClick={handleMenu}>
          {userInitials}
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Button color="inherit">
        <Link to="/login" className={classes.link}>
          Login
        </Link>
      </Button>
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
