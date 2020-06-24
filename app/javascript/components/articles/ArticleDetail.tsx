import axios, { CancelTokenSource, CancelTokenStatic } from "axios";
import React, { useEffect, useState } from "react";
import {
  Article,
  ArticleDetailMatchParams,
  ConsumerProps,
} from "../../common/types";

const ArticleDetail: React.FC<ArticleDetailMatchParams & ConsumerProps> = ({
  match,
  consumer,
}) => {
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    const articleID: string = match.params.id;
    const CancelToken: CancelTokenStatic = axios.CancelToken;
    const source: CancelTokenSource = CancelToken.source();

    const fetchSpecificArticle = () => {
      consumer
        .getSpecificArticle(source, articleID)
        .then((articleData: Article) => setArticle(articleData))
        .catch((err: any) => {
          if (axios.isCancel(err)) {
            console.log("cancelled");
          }
        });
    };
    fetchSpecificArticle();

    return () => {
      source.cancel();
    };
  }, []);

  if (article === undefined) {
    return null;
  }

  return (
    <React.Fragment>
      <h1>{article.title}</h1>
      <img src={article.user.initialsImageLink} alt="author" />
      <p>{article.content}</p>
    </React.Fragment>
  );
};

export default ArticleDetail;
