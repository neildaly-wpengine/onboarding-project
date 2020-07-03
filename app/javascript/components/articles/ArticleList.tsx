import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Article, ConsumerProps } from "../../common/types";
import ArticleHighlight from "./ArticleHighlight";

const ArticleList: React.FC<ConsumerProps> = ({ consumer }) => {
  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    const fetchAllArticles = async () => {
      const articleData = await consumer.getAllArticles();
      setArticles(articleData);
    };
    fetchAllArticles();
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
      <Box display="flex" justifyContent="center" m={1} p={1} margin={0}>
        <Typography
          variant="h2"
          gutterBottom
          style={{ marginTop: 5 }}
          data-testid="article-list-title"
        >
          Articles
        </Typography>
      </Box>
      <Grid container spacing={10} data-testid="resolved">
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
