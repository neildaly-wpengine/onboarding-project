import React, { useEffect, useState } from "react";
import axios from "axios";
import { Article } from "../../common/types";
import ArticleHighlight from "./ArticleHighlight";
const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchAllArticles = () => {
      axios
        .get("/api/v1/articles", { cancelToken: source.token })
        .then((articlesResponse) => {
          new JSONAPIDeserializer({
            keyForAttribute: "camelCase",
          }).deserialize(
            articlesResponse.data,
            (_err: any, articlesResponseData: Article[]) => {
              setArticles(articlesResponseData);
            }
          );
        })
        .catch((err) => {
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
