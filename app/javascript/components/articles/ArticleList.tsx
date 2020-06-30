import {
  CircularProgress,
  createStyles,
  Grid,
  makeStyles,
  Theme
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Article, ConsumerProps } from "../../common/types";
import ArticleHighlight from "./ArticleHighlight";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: { margin: 0, width: "100%" },
  })
);

const ArticleList: React.FC<ConsumerProps> = ({ consumer }) => {
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
    return <CircularProgress data-testid="loading" />;
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

  return (
    <React.Fragment>
      <Grid container data-testid="resolved" style={{ marginTop: 25 }}>
        <Grid item xs={12}>
          <Grid container justify="center" className={classes.grid}>
            {articlesList}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ArticleList;
