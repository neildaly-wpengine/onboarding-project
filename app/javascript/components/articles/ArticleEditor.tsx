import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Article,
  ArticleCreationContent,
  ArticleDetailMatchParams,
  AuthStoreProps,
  ConsumerProps,
  CreateArticleBody,
} from "../../common/types";
import ArticleForm from "./ArticleForm";

const ArticleEditor: React.FC<
  ConsumerProps & AuthStoreProps & ArticleDetailMatchParams
> = ({ consumer, authStore, match }) => {
  const [edited, setEdited] = useState<boolean>(false);
  const [article, setArticle] = useState<Article>();
  const [articleBody, setArticleBody] = useState<ArticleCreationContent>({
    title: "",
    content: "",
    userId: parseInt(authStore.user.id),
  });
  useEffect(() => {
    let mounted: boolean = true;
    const fetchSpecificArticle = async () => {
      const articleID: string = match.params.id;
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

  const handleChange = (e: React.BaseSyntheticEvent): void => {
    const { name, value } = e.target;
    setArticleBody({ ...articleBody, [name]: value });
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const response = await consumer.editArticle({
      article: articleBody,
    } as CreateArticleBody);

    setEdited(() => {
      return Boolean(response.updatedAt);
    });
  };

  if (article === undefined) {
    return null;
  }
  if (!authStore.authenticated) {
    return <Redirect to="/" />;
  }

  if (edited) {
    console.log("edited");
    return <Redirect to={{ pathname: "/", state: { updated: true } }} />;
  }

  return (
    <ArticleForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      icon={<EditIcon />}
      formTitle="Edit Article"
      buttonText="Edit"
      titlePlaceholder={article.title}
      contentPlaceholder={article.content}
    />
  );
};

export default ArticleEditor;
