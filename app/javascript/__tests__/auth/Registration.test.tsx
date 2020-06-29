import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, RenderResult } from "@testing-library/react";
import * as React from "react";
import Registration from "../../components/auth/Registration";
import { consumer } from "../articles/__helpers__/test-data";
import { BrowserRouter as Router } from "react-router-dom";

const renderHelper = (): RenderResult => {
  return render(
    <Router>
      <Registration consumer={consumer} />;
    </Router>
  );
};

afterEach(cleanup);

describe("<Registration />", () => {
  describe("Snapshots", () => {
    test("should render an article highlight without crashing", () => {
      const { container } = renderHelper();

      expect(container).toMatchSnapshot();
    });
  });
});
