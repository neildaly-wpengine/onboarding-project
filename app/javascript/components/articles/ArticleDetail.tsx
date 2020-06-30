import {
  Avatar,
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Article,
  ArticleDetailMatchParams,
  ConsumerProps,
} from "../../common/types";

const useStyles = makeStyles({
  boxHeader: {
    margin: 0,
    height: 450,
    padding: 0,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageHeader: {
    objectFit: "cover",
    minWidth: "100%",
    minHeight: "100%",
    flexShrink: 0,
  },
  mainArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  mainHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 15,
  },
  avatar: {
    alignSelf: "center",
  },
});

const ArticleDetail: React.FC<ArticleDetailMatchParams & ConsumerProps> = ({
  match,
  consumer,
}) => {
  const [article, setArticle] = useState<Article>();
  const classes = useStyles();

  useEffect(() => {
    let mounted: boolean = true;
    const fetchSpecificArticle = async () => {
      const articleID: string = match.params.id;
      const articleData = await consumer.getSpecificArticle(articleID);
      if (mounted) {
        setArticle(articleData);
      }
    };
    fetchSpecificArticle();

    return () => {
      mounted = false;
    };
  }, []);

  if (article === undefined) {
    return <CircularProgress data-testid="loading" />;
  }

  article.stockImage = `https://picsum.photos/1920/450?image=${article.id}`;

  return (
    <React.Fragment>
      <Box m={1} p={1} className={classes.boxHeader} width={1}>
        <img
          data-testid="specific-article-stock-image"
          src={article.stockImage}
          alt={article.title}
          className={classes.imageHeader}
        />
      </Box>
      <Box m={1} p={1} className={classes.mainArea} data-testid="resolved">
        <Box width="50%" className={classes.mainHeader}>
          <Typography variant="h2" gutterBottom>
            {article.title}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {`${article.user.firstName} ${article.user.lastName}`}
          </Typography>
          <Avatar
            aria-label="user"
            src={article.user.initialsImageLink}
            className={classes.avatar}
          />
          <Typography variant="subtitle1" gutterBottom>
            {article.createdAt}
          </Typography>
        </Box>
        <Box width="50%" className={classes.mainHeader}>
          <Typography variant="body1" align="justify" gutterBottom>
            {article.content}
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ArticleDetail;
