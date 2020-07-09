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
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(4),
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

interface ArticleEditorProps {
  handleSubmit(e: React.BaseSyntheticEvent): void;
  handleChange(e: React.BaseSyntheticEvent): void;
  icon: JSX.Element;
  formTitle: string;
  buttonText: string;
  titlePlaceholder?: string;
  contentPlaceholder?: string;
  disabled?: boolean;
}

const ArticleForm: React.FC<ArticleEditorProps> = ({
  handleSubmit,
  handleChange,
  icon,
  formTitle,
  buttonText,
  titlePlaceholder,
  disabled,
  contentPlaceholder,
}) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{icon}</Avatar>
        <Typography component="h1" variant="h5">
          {formTitle}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                variant="outlined"
                inputProps={{ "data-testid": "titleInput" }}
                required
                fullWidth
                id="title"
                defaultValue={titlePlaceholder}
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
                inputProps={{ "data-testid": "contentInput" }}
                id="content"
                label="Content"
                multiline
                defaultValue={contentPlaceholder}
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
            disabled={disabled}
          >
            {buttonText}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ArticleForm;
