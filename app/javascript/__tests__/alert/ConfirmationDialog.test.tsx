import "@testing-library/jest-dom/extend-expect";
import {
  cleanup,
  render,
  RenderResult,
  act,
  fireEvent,
} from "@testing-library/react";
import * as React from "react";
import ConfirmationDialog from "../../components/alert/ConfirmationDialog";

const renderHelper = (
  open = false,
  handleCancel = jest.fn(),
  handleOk = jest.fn()
): RenderResult => {
  return render(
    <ConfirmationDialog
      open={open}
      handleCancel={handleCancel}
      handleOk={handleOk}
      title="Some Title"
      message="Some message.."
    />
  );
};

afterEach(cleanup);

describe("<ConfirmationDialog />", () => {
  describe("Snapshots", () => {
    test("should not render a confirmation dialog when closed", () => {
      const { container } = renderHelper();

      expect(container).toMatchSnapshot();
    });

    test("should render a confirmation dialog when open", () => {
      const { getByTestId } = renderHelper(true);

      expect(getByTestId("delete-dialog")).toBeInTheDocument();
    });
  });
  describe("Actions", () => {
    test("should fire appropriate actions when clicked", () => {
      const closeAction: jest.Mock = jest.fn(),
        okAction: jest.Mock = jest.fn();
      const { getByTestId } = renderHelper(true, closeAction, okAction);

      act(() => {
        fireEvent.click(getByTestId("dialog-cancel"));
        fireEvent.click(getByTestId("dialog-ok"));
      });

      expect(closeAction).toHaveBeenCalledTimes(1);
      expect(okAction).toHaveBeenCalledTimes(1);
    });
  });
});
