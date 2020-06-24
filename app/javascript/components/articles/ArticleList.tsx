import React, { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  attributes: ArticleAttributes;
  id: number;
  user: User;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  initialsAvatar: string;
}

interface ArticleAttributes {
  title: string;
  content: string;
  userID: number;
  createdAt: Date;
  updatedAt: Date;
  discardedAt?: Date;
  archived: boolean;
}

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchAllArticles = async () => {
      const articlesResponse = await axios.get("/api/v1/articles");
      setArticles(articlesResponse.data.data);
    };

    fetchAllArticles();
  }, []);

  if (articles === []) {
    return null;
  }

  console.log(articles);

  const articlesList = articles.map((article: Article, index: number) => {
    return (
      <li key={index}>
        {article.attributes.title} -{" "}
        {article.attributes.content.substring(0, 20)}
      </li>
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
