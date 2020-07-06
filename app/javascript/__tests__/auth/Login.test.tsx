import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, RenderResult } from "@testing-library/react";
import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../../components/auth/Login";
import { consumer } from "../articles/__helpers__/test-data";

const renderHelper = (): RenderResult => {
  return render(
    <Router>
      <Login consumer={consumer} notifyLogin={jest.fn()} />;
    </Router>
  );
};

afterEach(cleanup);
jest.mock("axios");

describe("<Login />", () => {
  describe("Snapshots", () => {
    test("should render without crashing", () => {
      const { container } = renderHelper();

      expect(container).toMatchSnapshot();
    });
  });
});
