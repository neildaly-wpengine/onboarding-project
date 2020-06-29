import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ConsumerProps,
  RegistrationUser,
  Registration,
  RegistrationBody,
} from "../../common/types";
import { consumer } from "../../__tests__/articles/__helpers__/test-data";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    margin: theme.spacing(3, 0, 2),
  },
}));

const Registration: React.FC<ConsumerProps> = () => {
  const [confirmPasswordHelper, setConfirmPasswordHelper] = useState("");
  const [registrationUser, setRegistrationUser] = useState<RegistrationUser>({
    email: "",
    firstName: "",
    lastName: "",
    passwordConfirmation: "",
    password: "",
  });

  const validPasswordEntries = (): boolean => {
    return (
      registrationUser?.password === registrationUser?.passwordConfirmation
    );
  };

  const handleChange = (e: React.BaseSyntheticEvent): void => {
    const { name, value } = e.target;
    setRegistrationUser({ ...registrationUser, [name]: value });
  };

  const handleSubmit = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();

    if (!validPasswordEntries()) {
      setConfirmPasswordHelper("Passwords do not match.");
      return;
    }
    setConfirmPasswordHelper("");
    registerUser();
  };

  const registerUser = async () => {
    const registrationResponse = await consumer.registerNewUser({
      user: registrationUser,
    } as RegistrationBody);

    if (registrationResponse.data.status === "created") {
      // redirect
    }
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} method="post">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                onChange={handleChange}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={handleChange}
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={handleChange}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={handleChange}
                fullWidth
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                helperText={confirmPasswordHelper}
                id="passwordConfirmation"
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
            Register
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Registration;
