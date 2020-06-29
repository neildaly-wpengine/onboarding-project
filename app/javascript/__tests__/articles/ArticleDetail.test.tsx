import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, RenderResult, waitFor } from "@testing-library/react";
import axios from "axios";
import { createLocation, createMemoryHistory } from "history";
import * as React from "react";
import { match } from "react-router";
import { ArticleDetailMatchParams } from "../../common/types";
import ArticleDetail from "../../components/articles/ArticleDetail";
import {
  consumer,
  jsonAPISpecificArticleResponseData,
  mockArticle,
} from "./__helpers__/test-data";

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

const renderArticleDetail = (): RenderResult => {
  return render(
    <ArticleDetail consumer={consumer} {...createRouteComponentProps()} />
  );
};

afterEach(cleanup);

jest.mock("axios");

describe("<ArticleDetail />", () => {
  describe("Content", () => {
    it("renders correctly", async () => {
      const expectedResponse = {
        data: jsonAPISpecificArticleResponseData,
      };

      (axios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(expectedResponse)
      );

      const { container, getByTestId } = renderArticleDetail();
      expect(getByTestId("loading")).toHaveAttribute("role", "progressbar");

      const resolvedData = await waitFor(() => getByTestId("resolved"));

      expect(container).toMatchSnapshot();
      expect(getByTestId("specific-article-stock-image")).toHaveAttribute(
        "src",
        `https://picsum.photos/1920/450?image=${mockArticle.id}`
      );
      expect(axios.get).toHaveBeenCalledWith(
        `/api/v1/articles/${mockArticle.id}`
      );
      expect(resolvedData).toBeInTheDocument();
      expect(resolvedData).not.toBeEmptyDOMElement();
    });
  });
});
