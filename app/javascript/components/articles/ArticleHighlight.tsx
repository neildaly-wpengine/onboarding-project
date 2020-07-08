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
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { Link } from "react-router-dom";
import { Article } from "../../common/types";
import { createUserInitials } from "../../common/common";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 10,
      maxWidth: 345,
      margin: 20,
      // display card actions on complete bottom
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    cardActions: {
      // display card actions on complete bottom
      marginTop: "auto",
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const ArticleHighlight: React.FC<Article> = ({
  title,
  content,
  user,
  createdAt,
  id,
  stockImage,
}) => {
  const classes = useStyles();
  const userInitials: string = createUserInitials(user);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="user" className={classes.avatar}>
            {userInitials}
          </Avatar>
        }
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
