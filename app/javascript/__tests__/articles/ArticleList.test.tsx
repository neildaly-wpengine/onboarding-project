import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import * as React from "react";
import APIConsumer from "../../common/api-consumer";
import ArticleList from "../../components/articles/ArticleList";

const renderHelper = (): JSX.Element => {
  const consumer: APIConsumer = new APIConsumer();
  return <ArticleList consumer={consumer} />;
};

describe("<ArticleList />", () => {
  test("should render a heading without articles", () => {
    const { container } = render(renderHelper());

    expect(container).toMatchSnapshot();
  });

  describe("Content", () => {
    test("should render an article heading", () => {
      const { getByTestId } = render(renderHelper());

      expect(getByTestId("article-list-title")).toHaveTextContent("Articles");
      expect(getByTestId("article-list-title")).toHaveStyle("margin-top: 5px;");
    });
  });
});
