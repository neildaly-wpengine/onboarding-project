import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, RenderResult, waitFor } from "@testing-library/react";
import axios from "axios";
import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ArticleList from "../../components/articles/ArticleList";
import {
  consumer,
  jsonAPIAllArticleResponseData,
} from "./__helpers__/test-data";

const renderArticleList = (): RenderResult => {
  return render(
    <Router>
      <ArticleList consumer={consumer} />
    </Router>
  );
};

afterEach(() => {
  cleanup;
});

jest.mock("axios");

describe("<ArticleList />", () => {
  describe("Content", () => {
    it("renders correctly", async () => {
      const expectedResponse = {
        data: jsonAPIAllArticleResponseData,
      };

      (axios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(expectedResponse)
      );

      const { container, getByTestId } = renderArticleList();
      expect(getByTestId("loading")).toHaveAttribute("role", "progressbar");

      const resolvedData = await waitFor(() => getByTestId("resolved"));

      expect(container).toMatchSnapshot();
      expect(axios.get).toHaveBeenCalledWith("/api/v1/articles");
      expect(resolvedData).toBeInTheDocument();
      expect(resolvedData).not.toBeEmptyDOMElement();
      expect(axios.get).toBeCalledTimes(1);
    });
  });
});
