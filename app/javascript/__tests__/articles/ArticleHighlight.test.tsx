import "@testing-library/jest-dom/extend-expect";
import {
  cleanup,
  render,
  RenderResult,
  act,
  fireEvent,
} from "@testing-library/react";
import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ArticleHighlight from "../../components/articles/ArticleHighlight";
import { mockArticle } from "./__helpers__/test-data";

const renderHelper = (
  authenticated = false,
  currentUserID = "1"
): RenderResult => {
  return render(
    <Router>
      <ArticleHighlight
        article={mockArticle}
        auth={{
          authenticated: authenticated,
          currentUserID: currentUserID,
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

    test("should show a menu when authenticated & owner", () => {
      const { getByTestId } = renderHelper(true);
      const cardMenuToggle = getByTestId("card-menu-toggle");

      fireEvent.click(cardMenuToggle);
      const cardMenu = getByTestId("card-menu");

      expect(cardMenu).toBeInTheDocument();
    });

    test("should not show a menu when not authenticated", () => {
      const { queryByTestId } = renderHelper(true, "2");

      expect(queryByTestId("card-menu-toggle")).not.toBeInTheDocument();
    });

    test("should show a confirmation modal when deleting", () => {
      const { getByTestId } = renderHelper(true);
      const cardMenuToggle = getByTestId("card-menu-toggle");

      fireEvent.click(cardMenuToggle);
      act(() => {
        fireEvent.click(getByTestId("menu-delete"));
      });
      const confirmationDialog = getByTestId("delete-dialog");
      const dialogMessage = getByTestId("dialog-message");

      expect(confirmationDialog).toBeInTheDocument();
      expect(dialogMessage).toHaveTextContent(
        "Are you sure you wish to delete this article?"
      );
    });
  });
});
