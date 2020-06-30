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
import Registration from "../../components/auth/Registration";
import { consumer } from "../articles/__helpers__/test-data";
import {
  registrationBody as body,
  successfulRegistrationResponse,
} from "./__helpers__/test-data";

const renderHelper = (): RenderResult => {
  return render(
    <Router>
      <Registration consumer={consumer} />;
    </Router>
  );
};

afterEach(cleanup);
jest.mock("axios");

describe("<Registration />", () => {
  describe("Snapshots", () => {
    test("should render an article highlight without crashing", () => {
      const { container } = renderHelper();

      expect(container).toMatchSnapshot();
    });
  });

  describe("Form inputs", () => {
    test("should update when changed", () => {
      const { getByTestId } = renderHelper();
      const emailInput = getByTestId("emailInput");
      const firstNameInput = getByTestId("firstNameInput");
      const lastNameInput = getByTestId("lastNameInput");

      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(firstNameInput, { target: { value: "Test" } });
      fireEvent.change(lastNameInput, { target: { value: "User" } });

      expect(emailInput).toHaveValue("test@test.com");
      expect(firstNameInput).toHaveValue("Test");
      expect(lastNameInput).toHaveValue("User");
    });
  });

  describe("Form submission", () => {
    test("should show error with unequal passwords", () => {
      const { getByTestId, container } = renderHelper();
      const passwordInput = getByTestId("passwordInput");
      const passwordConfirmationInput = getByTestId(
        "passwordConfirmationInput"
      );
      const submit = getByTestId("submit");

      fireEvent.change(passwordInput, {
        target: {
          value: body.user.password,
        },
      });
      fireEvent.change(passwordConfirmationInput, {
        target: {
          value: body.user.passwordConfirmation + "d",
        },
      });

      act(() => {
        fireEvent.click(submit);
      });

      expect(
        container.querySelector("#passwordConfirmation-helper-text")
      ).toBeInTheDocument();
      expect(
        container.querySelector("#passwordConfirmation-helper-text")
      ).toHaveTextContent("Passwords do not match.");
    });

    test("should register with adequate input", async () => {
      const { getByTestId } = renderHelper();
      const emailInput = getByTestId("emailInput");
      const firstNameInput = getByTestId("firstNameInput");
      const lastNameInput = getByTestId("lastNameInput");
      const passwordInput = getByTestId("passwordInput");
      const passwordConfirmationInput = getByTestId(
        "passwordConfirmationInput"
      );
      const expectedResponse = {
        data: successfulRegistrationResponse,
      };

      fireEvent.change(firstNameInput, {
        target: { value: body.user.firstName },
      });
      fireEvent.change(lastNameInput, {
        target: { value: body.user.lastName },
      });
      fireEvent.change(emailInput, {
        target: { value: body.user.email },
      });
      fireEvent.change(passwordInput, {
        target: { value: body.user.password },
      });
      fireEvent.change(passwordConfirmationInput, {
        target: { value: body.user.passwordConfirmation },
      });

      (axios.post as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(expectedResponse)
      );

      act(() => {
        fireEvent.click(getByTestId("submit"));
      });

      expect(axios.post).toBeCalledTimes(1);
      expect(axios.post).toBeCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        "/api/v1/registrations",
        humps.decamelizeKeys(body),
        { withCredentials: true }
      );
    });
  });
});
