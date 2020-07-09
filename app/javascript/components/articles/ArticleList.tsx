import { createStyles, Fab, Grid, makeStyles, Theme } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Article,
  ArticleListLocationState,
  AuthStoreProps,
  ConsumerProps,
} from "../../common/types";
import CollapsibleAlert from "../alert/CollapsibleAlert";
import ArticleHighlight from "./ArticleHighlight";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: { margin: 0, width: "100%" },
    link: {
      textDecoration: "none",
      color: "#fff",
      lineHeight: 0,
    },
    fab: {
      margin: 0,
      top: "auto",
      right: 20,
      bottom: 20,
      left: "auto",
      position: "fixed",
    },
  })
);

const ArticleList: React.FC<
  ConsumerProps & AuthStoreProps & ArticleListLocationState
> = ({ consumer, authStore, location }) => {
  const [articles, setArticles] = useState<Article[]>();
  const [alertMessage, setAlertMessage] = useState<string>("");
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    let mounted: boolean = true;
    const fetchAllArticles = async () => {
      const articleData = await consumer.getAllArticles();
      if (mounted) {
        setArticles(articleData);
      }
    };
    fetchAllArticles();

    // Handle article creation flash
    const handleAlertFlash = (): void => {
      if (mounted) {
        if (location.state !== undefined && location.state.message) {
          setAlertMessage(location.state.message);
          const state = location.state;
          delete state.message;
          history.replace({ ...history.location, state });
        }
      }
    };
    handleAlertFlash();

    return () => {
      mounted = false;
    };
  }, []);

  if (articles === undefined) {
    return null;
  }

  const closeAlert = (): void => {
    setAlertMessage("");
  };

  const articlesList = articles.map((article: Article) => {
    return (
      <ArticleHighlight
        key={article.id}
        stockImage={`https://picsum.photos/400/200?image=${article.id}`}
        title={article.title}
        content={article.content}
        user={article.user}
        createdAt={article.createdAt}
        id={article.id}
        authenticated={authStore.authenticated}
        currentUserID={authStore.user.id}
      />
    );
  });

  const createArticleMarkup: JSX.Element = authStore.authenticated ? (
    <Fab
      color="secondary"
      aria-label="add"
      data-testid="create-fab"
      className={classes.fab}
    >
      <Link to="/create" className={classes.link}>
        <AddIcon />
      </Link>
    </Fab>
  ) : (
    <></>
  );

  return (
    <React.Fragment>
      <CollapsibleAlert
        message={alertMessage}
        severity="success"
        showAlert={alertMessage !== ""}
        closeAlert={closeAlert}
      />
      <Fade in={true}>
        <Grid container data-testid="resolved" style={{ marginTop: 25 }}>
          <Grid item xs={12}>
            <Grid container justify="center" className={classes.grid}>
              {articlesList}
            </Grid>
          </Grid>
        </Grid>
      </Fade>
      {createArticleMarkup}
    </React.Fragment>
  );
};

export default ArticleList;
