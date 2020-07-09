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
import ConfirmationDialog from "../alert/ConfirmationDialog";

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

interface ArticleHighlightProps {
  article: Article;
  auth: AuthenticatedProps;
  notifyDelete(articleID: string): void;
}

const ArticleHighlight: React.FC<ArticleHighlightProps> = ({
  article,
  auth,
  notifyDelete,
}) => {
  const classes = useStyles();
  const userInitials: string = createUserInitials(article.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deletedArticle, setDeletedArticle] = useState<string>("");

  const articleOwner: boolean =
    auth.currentUserID.toString() === article.user.id;

  const toggleCardHeaderMenu = (e: React.BaseSyntheticEvent): void => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancelDialog = (): void => {
    setDialogOpen(false);
    setDeletedArticle("");
  };

  const handleOkDialog = (): void => {
    setDialogOpen(false);
    notifyDelete(deletedArticle);
  };

  const handleDelete = (id: string) => {
    setDialogOpen(true);
    setAnchorEl(null);
    setDeletedArticle(id);
  };

  const menu: JSX.Element =
    auth.authenticated && articleOwner ? (
      <Menu
        id="menu-appbar"
        data-testid="card-menu"
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
          <Link to={`/articles/edit/${article.id}`} className={classes.link}>
            Edit
          </Link>
        </MenuItem>
        <MenuItem
          data-testid="menu-delete"
          onClick={() => {
            handleDelete(article.id);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    ) : (
      <React.Fragment />
    );

  return (
    <React.Fragment>
      <ConfirmationDialog
        open={dialogOpen}
        handleCancel={handleCancelDialog}
        handleOk={handleOkDialog}
        title="Delete Article"
        message="Are you sure you wish to delete this article?"
      />
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="user" className={classes.avatar}>
              {userInitials}
            </Avatar>
          }
          action={
            auth.authenticated &&
            articleOwner && (
              <IconButton
                aria-label="settings"
                onClick={toggleCardHeaderMenu}
                data-testid="card-menu-toggle"
              >
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={`${article.user.firstName} ${article.user.lastName}`}
          subheader={article.createdAt}
          data-testid="article-card-header"
        />
        {menu}
        <CardActionArea>
          <CardMedia
            component="img"
            alt="blog-image"
            height="200"
            image={`https://picsum.photos/400/200?image=${article.id}`}
            title={article.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              data-testid="article-card-title"
            >
              {article.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              data-testid="article-card-content"
            >
              {article.content.substring(0, 200)}...
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
            to={`/articles/${article.id}`}
            data-testid="article-card-button"
          >
            View More
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default ArticleHighlight;
