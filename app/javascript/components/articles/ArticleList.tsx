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
  DeleteResponse,
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

  const handleArticleDeletion = (articleID: string) => {
    consumer.deleteArticle(articleID).then((response: DeleteResponse) => {
      if (response.data.discardedAt) {
        setArticles(
          articles.filter((article: Article) => {
            return article.id !== articleID;
          })
        );
      }
    });
  };

  const articlesList = articles.map((article: Article) => {
    return (
      <ArticleHighlight
        key={article.id}
        article={article}
        auth={{
          authenticated: authStore.authenticated,
          currentUserID: authStore.user.id,
        }}
        notifyDelete={handleArticleDeletion}
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
