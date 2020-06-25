import "@testing-library/jest-dom/extend-expect";
import { cleanup, render } from "@testing-library/react";
import * as React from "react";
import APIConsumer from "../../common/api-consumer";
import { Article, ArticleDetailMatchParams, User } from "../../common/types";
import ArticleDetail from "../../components/articles/ArticleDetail";
import { match } from "react-router";
import { createMemoryHistory, createLocation } from "history";

const history = createMemoryHistory();

const consumer: APIConsumer = new APIConsumer();

const mockUser: User = {
  firstName: "Test",
  lastName: "User",
  id: "1",
};

const mockArticle: Article = {
  id: "10",
  title: "Some Fake Title",
  content: "Some dummy content",
  createdAt: "2020-06-24T16:10:53.448Z",
  user: mockUser,
};

const createRouteComponentProps = (): ArticleDetailMatchParams => {
  const path = `/articles/:id`;

  const match: match<{ id: string }> = {
    isExact: true,
    path,
    url: path.replace(":id", mockArticle.id),
    params: { id: mockArticle.id },
  };

  return {
    match: match,
    location: createLocation(match.url),
    history: history,
  };
};

const renderHelper = (): JSX.Element => {
  return <ArticleDetail consumer={consumer} {...createRouteComponentProps()} />;
};

afterEach(cleanup);

describe("<ArticleDetail />", () => {
  test("should render an empty div without articles", () => {
    const { container } = render(renderHelper());

    expect(container).toMatchSnapshot();
  });
});
