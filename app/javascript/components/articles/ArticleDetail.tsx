import React, { useState, useEffect } from "react";
import { Article } from "../../common/types";
import { RouteComponentProps } from "react-router-dom";

const ArticleDetail: React.FC<RouteComponentProps> = ({ match }) => {
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    const articleID = match.params.id;
    // fetch
  }, []);

  return (
    <React.Fragment>
      <p>Specific article {match.params.id}</p>
    </React.Fragment>
  );
};

export default ArticleDetail;
