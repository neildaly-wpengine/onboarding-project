import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import axios from "axios";
import humps from "humps";
import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthStore } from "../../common/types";
import ArticleCreator from "../../components/articles/ArticleCreator";
import {
  consumer,
  jsonAPISpecificArticleResponseData as response,
  mockUser,
} from "./__helpers__/test-data";

const renderArticleCreator = (authenticated = true): RenderResult => {
  const mockAuthStore: AuthStore = {
    authenticated: authenticated,
    user: mockUser,
  };
  return render(
    <Router>
      <ArticleCreator consumer={consumer} authStore={mockAuthStore} />
    </Router>
  );
};

afterEach(() => {
  cleanup;
  jest.resetAllMocks();
});

jest.mock("axios");

describe("<ArticleCreator />", () => {
  describe("Content", () => {
    it("renders correctly", () => {
      const { container } = renderArticleCreator();

      expect(container).toMatchSnapshot();
    });

    it("does not render when not authenticated", () => {
      const { container } = renderArticleCreator(false);

      expect(container).toMatchSnapshot();
      expect(container).toBeEmptyDOMElement();
    });

    it("successfully creates an article and redirects", async () => {
      const { getByTestId, container } = renderArticleCreator();
      const redirectURL: string = "/";
      const titleInput = getByTestId("titleInput");
      const contentInput = getByTestId("contentInput");
      const submit = getByTestId("submit");
      const expectedResponse = {
        data: {
          data: {
            response,
          },
        },
      };

      act(() => {
        fireEvent.change(titleInput, {
          target: {
            value: response.data.attributes.title,
          },
        });
      });
      act(() => {
        fireEvent.change(contentInput, {
          target: {
            value: response.data.attributes.content,
          },
        });
      });

      (axios.post as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(expectedResponse)
      );

      fireEvent.submit(submit);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        "/api/v1/articles",
        humps.decamelizeKeys({
          article: {
            title: response.data.attributes.title,
            content: response.data.attributes.content,
            userId: parseInt(response.included[0].id),
          },
        }),
        { withCredentials: true }
      );
      expect(container.innerHTML).toEqual(expect.stringContaining(redirectURL));
    });
  });
});
