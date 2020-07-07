import { createStyles, Fab, Grid, makeStyles, Theme } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Article, AuthStoreProps, ConsumerProps } from "../../common/types";
import ArticleHighlight from "./ArticleHighlight";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: { margin: 0, width: "100%" },
    link: {
      textDecoration: "none",
      color: "#fff",
    },
  })
);

const ArticleList: React.FC<ConsumerProps & AuthStoreProps> = ({
  consumer,
  authStore,
}) => {
  const [articles, setArticles] = useState<Article[]>();
  const classes = useStyles();

  useEffect(() => {
    let mounted: boolean = true;
    const fetchAllArticles = async () => {
      const articleData = await consumer.getAllArticles();
      if (mounted) {
        setArticles(articleData);
      }
    };
    fetchAllArticles();

    return () => {
      mounted = false;
    };
  }, []);

  if (articles === undefined) {
    return null;
  }

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
      />
    );
  });

  const createArticleMarkup: JSX.Element = authStore.authenticated ? (
    <Fab color="primary" aria-label="add" data-testid="create-fab">
      <Link to="/create" className={classes.link}>
        <AddIcon />
      </Link>
    </Fab>
  ) : (
    <></>
  );

  return (
    <React.Fragment>
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
