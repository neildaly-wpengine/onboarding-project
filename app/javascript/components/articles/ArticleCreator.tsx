import {
  Avatar,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import React, { useState } from "react";
import { Redirect } from "react-router";
import {
  AuthStoreProps,
  ConsumerProps,
  ArticleCreation,
} from "../../common/types";
import { initialState } from "../../reducers";

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

const ArticleCreator: React.FC<ConsumerProps & AuthStoreProps> = ({
  consumer,
  authStore,
}) => {
  const [articleCreation, setArticleCreation] = useState<ArticleCreation>({
    title: "",
    content: "",
  });
  if (!authStore.authenticated) {
    return <Redirect to="/" />;
  }

  const handleChange = (e: React.BaseSyntheticEvent): void => {
    const { name, value } = e.target;
    setArticleCreation({ ...articleCreation, [name]: value });
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Article
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="content"
                label="Content"
                multiline
                name="content"
                onChange={handleChange}
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
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ArticleCreator;
