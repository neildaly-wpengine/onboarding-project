import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import * as React from "react";
import APIConsumer from "../../common/api-consumer";
import ArticleList from "../../components/articles/ArticleList";

const consumer: APIConsumer = new APIConsumer();

describe("<ArticleList />", () => {
  test("should render an empty div without articles", () => {
    const { container } = render(<ArticleList consumer={consumer} />);

    expect(container).toMatchSnapshot();
  });
});
