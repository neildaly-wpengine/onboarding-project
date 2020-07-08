import React, { useState } from "react";
import {
  AuthStoreProps,
  ConsumerProps,
  CreateArticleBody,
  ArticleCreationContent,
} from "../../common/types";
import ArticleForm from "./ArticleForm";
import EditIcon from "@material-ui/icons/Edit";

const ArticleEditor: React.FC<ConsumerProps & AuthStoreProps> = ({
  consumer,
  authStore,
}) => {
  const [edited, setEdited] = useState<boolean>(false);
  const [articleBody, setArticleBody] = useState<ArticleCreationContent>({
    title: "",
    content: "",
    userId: parseInt(authStore.user.id),
  });

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
      return Boolean(response.createdAt);
    });
  };
  return (
    <ArticleForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      icon={<EditIcon />}
      formTitle="Edit Article"
      buttonText="Edit"
    />
  );
};

export default ArticleEditor;
