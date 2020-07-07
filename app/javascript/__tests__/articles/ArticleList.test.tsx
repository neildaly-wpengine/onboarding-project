import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, RenderResult, waitFor } from "@testing-library/react";
import axios from "axios";
import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthStore } from "../../common/types";
import ArticleList from "../../components/articles/ArticleList";
import {
  consumer,
  jsonAPIAllArticleResponseData,
  mockUser,
} from "./__helpers__/test-data";

const renderArticleList = (authenticated = false): RenderResult => {
  const mockAuthStore: AuthStore = {
    authenticated: authenticated,
    user: mockUser,
  };
  return render(
    <Router>
      <ArticleList consumer={consumer} authStore={mockAuthStore} />
    </Router>
  );
};

afterEach(() => {
  cleanup;
  jest.clearAllMocks();
});

jest.mock("axios");

describe("<ArticleList />", () => {
  describe("Content", () => {
    it("renders correctly when not authenticated", async () => {
      const expectedResponse = {
        data: jsonAPIAllArticleResponseData,
      };

      (axios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(expectedResponse)
      );

      const { container, getByTestId } = renderArticleList();
      const resolvedData = await waitFor(() => getByTestId("resolved"));

      expect(container).toMatchSnapshot();
      expect(axios.get).toHaveBeenCalledWith("/api/v1/articles");
      expect(resolvedData).toBeInTheDocument();
      expect(resolvedData).not.toBeEmptyDOMElement();
      expect(axios.get).toBeCalledTimes(1);
    });

    it("renders correctly when authenticated", async () => {
      const expectedResponse = {
        data: jsonAPIAllArticleResponseData,
      };

      (axios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(expectedResponse)
      );

      const { container, getByTestId } = renderArticleList(true);
      const resolvedData = await waitFor(() => getByTestId("resolved"));
      const createFab = getByTestId("create-fab");

      expect(container).toMatchSnapshot();
      expect(axios.get).toHaveBeenCalledWith("/api/v1/articles");
      expect(resolvedData).toBeInTheDocument();
      expect(resolvedData).not.toBeEmptyDOMElement();
      expect(createFab).toBeInTheDocument();
      expect(axios.get).toBeCalledTimes(1);
    });
  });
});
