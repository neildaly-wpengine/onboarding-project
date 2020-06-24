import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArticleProps } from "../../common/types";
import Article from "./Article";
const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  useEffect(() => {
    const fetchAllArticles = async () => {
      const responseData = await axios
        .get("/api/v1/articles")
        .then((articlesResponse) => {
          return new JSONAPIDeserializer({
            keyForAttribute: "camelCase",
          }).deserialize(
            articlesResponse.data,
            (_err: any, articlesResponseData: ArticleProps[]) => {
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

  const articlesList = articles.map((article: ArticleProps) => {
    return (
      <Article
        key={article.id}
        title={article.title}
        content={article.content}
        user={article.user}
        createdAt={article.createdAt}
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
