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
    maxWidth: 345,
  },
});

const ArticleHighlight: React.FC<Article> = ({
  title,
  content,
  user,
  createdAt,
  link,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ margin: 10 }}>
      <CardHeader
        avatar={<Avatar aria-label="user" src={user.initialsImageLink} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={createdAt}
      />
      <CardActionArea>
        <CardMedia
          component="img"
          alt="blog-image"
          height="200"
          image="https://picsum.photos/400/200"
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content.substring(0, 200)}...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/articles/${link}`}
        >
          View More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleHighlight;
