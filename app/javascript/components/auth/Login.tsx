import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthProps, LoginBody, LoginUser } from "../../common/types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "95vh",
  },
  image: {
    backgroundImage:
      "url(https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 4),
  },
  link: {
    color: theme.palette.secondary.dark,
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

const Login: React.FC<AuthProps> = ({ consumer, notifyLogin }) => {
  const classes = useStyles();
  const [loginUser, setLoginUser] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const loginBody: LoginBody = {
      user: loginUser,
    };
    const loginResponse = await consumer.loginUser(loginBody);

    if (loginResponse.data.status === 401) {
      console.log("");
    }
  };

  const handleChange = (e: React.BaseSyntheticEvent): void => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <div className={classes.paper}>
          <Alert severity="error" className={classes.alert}>
            Could not log in with those credentials!
          </Alert>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  inputProps={{ "data-testid": "emailInput" }}
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  inputProps={{ "data-testid": "passwordInput" }}
                  id="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                  Don't have an account?{" "}
                  <Link to="/register" className={classes.link}>
                    Create one.
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
