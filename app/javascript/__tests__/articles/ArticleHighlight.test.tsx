import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, RenderResult } from "@testing-library/react";
import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ArticleHighlight from "../../components/articles/ArticleHighlight";
import { mockArticle } from "./__helpers__/test-data";

const renderHelper = (): RenderResult => {
  return render(
    <Router>
      <ArticleHighlight
        article={mockArticle}
        auth={{
          authenticated: false,
          currentUserID: "",
        }}
        notifyDelete={jest.fn}
      />
    </Router>
  );
};

afterEach(cleanup);

describe("<ArticleHighlight />", () => {
  describe("Snapshots", () => {
    test("should render an article highlight without crashing", () => {
      const { container } = renderHelper();

      expect(container).toMatchSnapshot();
    });
  });

  describe("Content", () => {
    test("should render the correct title", () => {
      const { getByTestId } = renderHelper();

      expect(getByTestId("article-card-title")).toHaveTextContent(
        mockArticle.title
      );
    });

    test("should render the correct content", () => {
      const { getByTestId } = renderHelper();

      expect(getByTestId("article-card-content")).toHaveTextContent(
        `${mockArticle.content}...`
      );
    });

    test("should render the correct header details", () => {
      const { getByTestId } = renderHelper();

      expect(getByTestId("article-card-header")).toHaveTextContent(
        mockArticle.createdAt
      );
      expect(getByTestId("article-card-header")).toHaveTextContent(
        `${mockArticle.user.firstName} ${mockArticle.user.lastName}`
      );
    });

    test("should render the correct button content", () => {
      const { getByTestId } = renderHelper();

      expect(getByTestId("article-card-button")).toHaveTextContent("View More");
      expect(getByTestId("article-card-button").closest("a")).toHaveAttribute(
        "href",
        `/articles/${mockArticle.id}`
      );
    });
  });
});
