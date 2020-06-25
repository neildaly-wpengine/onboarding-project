import { Box, Grid, Typography } from "@material-ui/core";
import axios, { CancelTokenSource, CancelTokenStatic } from "axios";
import React, { useEffect, useState } from "react";
import { Article, ConsumerProps } from "../../common/types";
import ArticleHighlight from "./ArticleHighlight";

const ArticleList: React.FC<ConsumerProps> = ({ consumer }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const CancelToken: CancelTokenStatic = axios.CancelToken;
    const source: CancelTokenSource = CancelToken.source();

    const fetchAllArticles = () => {
      consumer
        .getAllArticles(source)
        .then((articleData: Article[]) => setArticles(articleData))
        .catch((err: any) => {
          if (axios.isCancel(err)) {
            console.log("cancelled");
          }
        });
    };
    fetchAllArticles();

    return () => {
      source.cancel();
    };
  }, []);

  if (articles === undefined || articles.length == 0) {
    return null;
  }

  const articlesList = articles.map((article: Article, index: number) => {
    return (
      <ArticleHighlight
        key={article.id}
        stockImage={`https://picsum.photos/400/200?image=${article.id}`}
        title={article.title}
        content={article.content}
        user={article.user}
        createdAt={article.createdAt}
        link={article.id}
      />
    );
  });

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center" m={1} p={1} margin={0}>
        <Typography variant="h2" gutterBottom style={{ marginTop: 5 }}>
          Articles
        </Typography>
      </Box>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {articlesList}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ArticleList;
