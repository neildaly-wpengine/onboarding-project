import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import * as React from "react";
import ArticleHighlight from "../../components/articles/ArticleHighlight";
import { Article, User } from "../../common/types";
import { BrowserRouter as Router } from "react-router-dom";

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

const renderHelper = (): JSX.Element => {
  return (
    <Router>
      <ArticleHighlight
        title={mockArticle.title}
        content={mockArticle.content}
        createdAt={mockArticle.createdAt}
        user={mockArticle.user}
        id={mockArticle.id}
      />
    </Router>
  );
};

afterEach(cleanup);

describe("<ArticleHighlight />", () => {
  describe("Snapshots", () => {
    test("should render an article highlight without crashing", () => {
      const { container } = render(renderHelper());

      expect(container).toMatchSnapshot();
    });
  });

  describe("Content", () => {
    test("should render the correct title", () => {
      const { getByTestId } = render(renderHelper());

      expect(getByTestId("article-card-title")).toHaveTextContent(
        mockArticle.title
      );
    });

    test("should render the correct content", () => {
      const { getByTestId } = render(renderHelper());

      expect(getByTestId("article-card-content")).toHaveTextContent(
        `${mockArticle.content}...`
      );
    });

    test("should render the correct header details", () => {
      const { getByTestId } = render(renderHelper());

      expect(getByTestId("article-card-header")).toHaveTextContent(
        mockArticle.createdAt
      );
      expect(getByTestId("article-card-header")).toHaveTextContent(
        `${mockArticle.user.firstName} ${mockArticle.user.lastName}`
      );
    });

    test("should render the correct button content", () => {
      const { getByTestId } = render(renderHelper());

      expect(getByTestId("article-card-button")).toHaveTextContent("View More");
      expect(getByTestId("article-card-button").closest("a")).toHaveAttribute(
        "href",
        `/articles/${mockArticle.id}`
      );
    });
  });
});
