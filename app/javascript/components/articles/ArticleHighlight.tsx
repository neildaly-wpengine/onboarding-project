import React from "react";
import { Article } from "../../common/types";
import { Link } from "react-router-dom";

const ArticleHighlight: React.FC<Article> = ({
  title,
  content,
  user,
  createdAt,
  link,
}) => {
  const getFullUserName = (): string => {
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <React.Fragment>
      <h2>{title}</h2>
      <img src={user.initialsImageLink} alt="avatar" />
      <strong>{getFullUserName()}</strong>
      <p>{createdAt}</p>
      <p>{content.substring(0, 20)}...</p>
      <Link to={`/articles/${link}`}>View More</Link>
    </React.Fragment>
  );
};

export default ArticleHighlight;
