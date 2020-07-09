import {
  Avatar,
  Box,
  CircularProgress,
  makeStyles,
  Typography,
  createStyles,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Article,
  ArticleDetailMatchParams,
  ConsumerProps,
} from "../../common/types";
import { createUserInitials } from "../../common/common";
import ArticleImageHeader from "./ArticleImageHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      backgroundColor: theme.palette.primary.main,
      marginBottom: theme.spacing(2),
    },
  })
);

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
  const userInitials: string = createUserInitials(article.user);

  return (
    <React.Fragment>
      <ArticleImageHeader title={article.title} id={article.id} />
      <Box m={1} p={1} className={classes.mainArea} data-testid="resolved">
        <Box width="50%" className={classes.mainHeader}>
          <Typography variant="h2" gutterBottom>
            {article.title}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {`${article.user.firstName} ${article.user.lastName}`}
          </Typography>
          <Avatar aria-label="user" className={classes.avatar}>
            {userInitials}
          </Avatar>
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
