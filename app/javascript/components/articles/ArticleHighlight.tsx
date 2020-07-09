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
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserInitials } from "../../common/common";
import { Article, AuthenticatedProps } from "../../common/types";

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
    link: {
      textDecoration: "none",
      color: "#000",
    },
  })
);

const ArticleHighlight: React.FC<Article & AuthenticatedProps> = ({
  title,
  content,
  user,
  createdAt,
  id,
  stockImage,
  authenticated,
  currentUserID,
}) => {
  const classes = useStyles();
  const userInitials: string = createUserInitials(user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const articleOwner: boolean = currentUserID.toString() === user.id;

  const toggleCardHeaderMenu = (e: React.BaseSyntheticEvent): void => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menu: JSX.Element =
    authenticated && articleOwner ? (
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link to={`/articles/edit/${id}`} className={classes.link}>
            Edit
          </Link>
        </MenuItem>
      </Menu>
    ) : (
      <React.Fragment />
    );

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="user" className={classes.avatar}>
            {userInitials}
          </Avatar>
        }
        action={
          authenticated &&
          articleOwner && (
            <IconButton aria-label="settings" onClick={toggleCardHeaderMenu}>
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={createdAt}
        data-testid="article-card-header"
      />
      {menu}
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
