import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { Link } from "react-router-dom";
import { Article } from "../../common/types";

const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    maxWidth: 345,
    margin: 10,
    // display card actions on complete bottom
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardActions: {
    // display card actions on complete bottom
    marginTop: "auto",
  },
});

const ArticleHighlight: React.FC<Article> = ({
  title,
  content,
  user,
  createdAt,
  id,
  stockImage,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label="user" src={user.initialsImageLink} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={createdAt}
        data-testid="article-card-header"
      />
      <CardActionArea>
        <CardMedia
          component="img"
          alt="blog-image"
          height="200"
          image={stockImage}
          title={title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            data-testid="article-card-title"
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            data-testid="article-card-content"
          >
            {content.substring(0, 200)}...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/articles/${id}`}
          data-testid="article-card-button"
        >
          View More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleHighlight;