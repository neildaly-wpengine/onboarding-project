import axios, { CancelTokenSource, CancelTokenStatic } from "axios";
import React, { useEffect, useState } from "react";
import { Article, ConsumerProps } from "../../common/types";
import ArticleHighlight from "./ArticleHighlight";

const ArticleList: React.FC<ConsumerProps> = ({ consumer }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const CancelToken: CancelTokenStatic = axios.CancelToken;
    const source: CancelTokenSource = CancelToken.source();

    const fetchAllArticles = () => {
      consumer
        .getAllArticles(source)
        .then((articleData: Article[]) => setArticles(articleData))
        .catch((err: any) => {
          if (axios.isCancel(err)) {
            console.log("cancelled");
          }
        });
    };
    fetchAllArticles();

    return () => {
      source.cancel();
    };
  }, []);

  if (articles === undefined || articles.length == 0) {
    return null;
  }

  const articlesList = articles.map((article: Article) => {
    return (
      <ArticleHighlight
        key={article.id}
        title={article.title}
        content={article.content}
        user={article.user}
        createdAt={article.createdAt}
        link={article.id}
      />
    );
  });

  return (
    <React.Fragment>
      <h1>Articles</h1>
      <ul>{articlesList}</ul>
    </React.Fragment>
  );
};

export default ArticleList;
