import { useEffect, useState } from "react";
import { consumer } from "../__tests__/articles/__helpers__/test-data";
import { Article, User } from "./types";

export const createUserInitials = (user: User): string => {
  const userInitials: string = `${user.firstName.charAt(
    0
  )}${user.lastName.charAt(0)}`.toUpperCase();

  return userInitials;
};

export const useSpecificArticle = (articleID: string): Article | undefined => {
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    let mounted: boolean = true;
    const fetchSpecificArticle = async () => {
      const articleData = await consumer.getSpecificArticle(articleID);
      if (mounted) {
        setArticle(articleData);
      }
    };
    fetchSpecificArticle();

    return () => {
      mounted = false;
    };
  }, []);

  return article;
};
