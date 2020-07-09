import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

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
  })
);

interface ImageHeaderProps {
  id: string;
  title: string;
}

const ArticleImageHeader: React.FC<ImageHeaderProps> = ({ id, title }) => {
  const classes = useStyles();
  return (
    <Box m={1} p={1} className={classes.boxHeader} width={1}>
      <img
        data-testid="specific-article-stock-image"
        src={`https://picsum.photos/1920/450?image=${id}`}
        alt={title}
        className={classes.imageHeader}
      />
    </Box>
  );
};

export default ArticleImageHeader;
