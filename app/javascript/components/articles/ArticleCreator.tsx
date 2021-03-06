import AddCircleIcon from "@material-ui/icons/AddCircle";
import React, { useState } from "react";
import { Redirect } from "react-router";
import {
  ArticleContent,
  AuthStoreProps,
  ConsumerProps,
  CreateArticleBody,
} from "../../common/types";
import ArticleForm from "./ArticleForm";

const ArticleCreator: React.FC<ConsumerProps & AuthStoreProps> = ({
  consumer,
  authStore,
}) => {
  const [created, setCreated] = useState<boolean>(false);
  const [articleBody, setArticleBody] = useState<ArticleContent>({
    title: "",
    content: "",
    userId: authStore.user.id,
  });

  const handleChange = (e: React.BaseSyntheticEvent): void => {
    const { name, value } = e.target;
    setArticleBody({ ...articleBody, [name]: value });
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const response = await consumer.createArticle({
      article: articleBody,
    } as CreateArticleBody);

    setCreated(() => {
      return Boolean(response.createdAt);
    });
  };

  if (created) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { message: "Article has been successfully created!" },
        }}
      />
    );
  }

  if (!authStore.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <ArticleForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      icon={<AddCircleIcon />}
      formTitle="Create Article"
      buttonText="Create"
    />
  );
};

export default ArticleCreator;
