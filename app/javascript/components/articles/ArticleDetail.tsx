import React, { useState, useEffect } from "react";
import { Article } from "../../common/types";
import { RouteComponentProps } from "react-router-dom";
import APIConsumer from "../../common/api-consumer";

const ArticleDetail: React.FC<RouteComponentProps & APIConsumer> = ({
  match,
  consumer,
}) => {
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
