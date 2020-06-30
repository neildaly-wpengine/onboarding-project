import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  ConsumerProps,
  NotifyAuthProps,
  Registration,
  RegistrationBody,
  RegistrationUser,
} from "../../common/types";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
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
}));

const Registration: React.FC<ConsumerProps & NotifyAuthProps> = ({
  consumer,
  toggleAuthentication,
}) => {
  const [confirmPasswordHelper, setConfirmPasswordHelper] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [registrationUser, setRegistrationUser] = useState<RegistrationUser>({
    email: "",
    firstName: "",
    lastName: "",
    passwordConfirmation: "",
    password: "",
  });
  const history = useHistory();

  const validPasswordEntries = (): boolean => {
    const valid: boolean =
      registrationUser?.password === registrationUser?.passwordConfirmation;

    valid ? setConfirmPasswordHelper("") : null;

    return valid;
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
    attemptUserRegistration();
  };

  const attemptUserRegistration = async () => {
    const registrationResponse = await consumer.registerNewUser({
      user: registrationUser,
    } as RegistrationBody);

    if (registrationResponse.data.status !== "created") {
      setEmailHelper(registrationResponse.data.message.email[0]);
      return;
    }
    toggleAuthentication();
    history.push("/");
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                inputProps={{ "data-testid": "firstNameInput" }}
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
                inputProps={{ "data-testid": "lastNameInput" }}
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
                inputProps={{ "data-testid": "emailInput" }}
                required
                onChange={handleChange}
                fullWidth
                helperText={emailHelper}
                error={emailHelper !== ""}
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
                inputProps={{ "data-testid": "passwordInput" }}
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
                inputProps={{ "data-testid": "passwordConfirmationInput" }}
                helperText={confirmPasswordHelper}
                error={confirmPasswordHelper !== ""}
                id="passwordConfirmation"
              />
            </Grid>
          </Grid>
          <Button
            data-testid="submit"
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
              <Typography variant="subtitle1" gutterBottom>
                Already have an account?{" "}
                <Link to="/login" className={classes.link}>
                  Sign In.
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Registration;
