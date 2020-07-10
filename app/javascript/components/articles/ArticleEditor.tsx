import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSpecificArticle } from "../../common/common";
import {
  ArticleContent,
  ArticleDetailMatchParams,
  AuthStoreProps,
  ConsumerProps,
  CreateArticleBody,
} from "../../common/types";
import ArticleForm from "./ArticleForm";
import ArticleImageHeader from "./ArticleImageHeader";

const ArticleEditor: React.FC<
  ConsumerProps & AuthStoreProps & ArticleDetailMatchParams
> = ({ consumer, authStore, match }) => {
  const article = useSpecificArticle(match.params.id);
  const [edited, setEdited] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [articleBody, setArticleBody] = useState<ArticleContent>({
    title: "",
    content: "",
    userId: authStore.user.id,
  });

  if (article === undefined) {
    return null;
  }

  const handleChange = (e: React.BaseSyntheticEvent): void => {
    setDisabled(false);
    const { name, value } = e.target;
    setArticleBody({ ...articleBody, [name]: value });
  };

  const checkUnchangedValues = (): void => {
    for (const key in articleBody) {
      if (articleBody[key] === "") {
        articleBody[key] = article[key];
      }
    }
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    checkUnchangedValues();
    const response = await consumer.editArticle(
      {
        article: articleBody,
      } as CreateArticleBody,
      article!.id
    );

    setEdited(() => {
      return Boolean(response.updatedAt);
    });
  };

  if (!authStore.authenticated) {
    return <Redirect to="/" />;
  }

  if (edited) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { message: "Article has been successfully edited!" },
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <ArticleImageHeader title={article.title} id={article.id} />
      <ArticleForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        icon={<EditIcon />}
        formTitle="Edit Article"
        buttonText="Edit"
        titlePlaceholder={article.title}
        contentPlaceholder={article.content}
        disabled={disabled}
      />
    </React.Fragment>
  );
};

export default ArticleEditor;
