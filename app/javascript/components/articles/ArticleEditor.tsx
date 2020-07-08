import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import {
  ArticleCreationContent,
  ArticleDetailMatchParams,
  AuthStoreProps,
  ConsumerProps,
  CreateArticleBody,
  Article,
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
      return Boolean(response.createdAt);
    });
  };

  if (article === undefined) {
    return null;
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
