import React from "react";
import { ArticleProps } from "../../common/types";

const Article: React.FC<ArticleProps> = ({
  title,
  content,
  user,
  createdAt,
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
    </React.Fragment>
  );
};

export default Article;
