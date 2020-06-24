import React, { useEffect, useState } from "react";
import axios from "axios";
import { Article } from "../../common/types";
const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchAllArticles = async () => {
      const responseData = await axios
        .get("/api/v1/articles")
        .then((articlesResponse) => {
          return new JSONAPIDeserializer({
            keyForAttribute: "camelCase",
          }).deserialize(
            articlesResponse.data,
            (_err: any, articlesResponseData: Article[]) => {
              return articlesResponseData;
            }
          );
        });
      setArticles(responseData);
    };

    fetchAllArticles();
  }, []);

  if (articles === undefined || articles.length == 0) {
    return null;
  }

  const articlesList = articles.map((article: Article, index: number) => {
    return <li key={index}>{article.title}</li>;
  });

  return (
    <React.Fragment>
      <h1>Articles</h1>
      <ul>{articlesList}</ul>
    </React.Fragment>
  );
};

export default ArticleList;
