import React from "react";
import { Redirect } from "react-router";
import { AuthStoreProps, ConsumerProps } from "../../common/types";

const ArticleCreator: React.FC<ConsumerProps & AuthStoreProps> = ({
  consumer,
  authStore,
}) => {
  if (!authStore.authenticated) {
    return <Redirect to="/" />;
  }
  return <React.Fragment>Create</React.Fragment>;
};

export default ArticleCreator;
