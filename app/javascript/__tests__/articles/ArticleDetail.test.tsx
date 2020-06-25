import "@testing-library/jest-dom/extend-expect";
import { cleanup, render } from "@testing-library/react";
import { createLocation, createMemoryHistory } from "history";
import * as React from "react";
import { match } from "react-router";
import { ArticleDetailMatchParams } from "../../common/types";
import ArticleDetail from "../../components/articles/ArticleDetail";
import { mockArticle, consumer } from "./__helpers__/test-data";

const history = createMemoryHistory();

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
