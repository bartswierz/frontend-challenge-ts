import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThankYouMessage from "../ThankYouMessage";
import "@testing-library/jest-dom";
// import { mockSubmitAnotherForm } from "../../../../mocks/FormProviderMocks";
import { FormContext } from "../../../../context/FormProvider";

describe("ThankYouMessage Component", () => {
  it("should display 'Bart' as the name", () => {
    render(<ThankYouMessage name="Bart" submitAnotherForm={jest.fn()} />);

    const nameText = screen.getByText(/bart/i);

    expect(nameText).toBeInTheDocument();
  });

  it("should invoke submitAnotherForm when the 'submit another' button is clicked", async () => {
    const mockSubmitAnotherForm = jest.fn();

    render(
      <FormContext.Provider value={{ submitAnotherForm: mockSubmitAnotherForm }}>
        <ThankYouMessage name="Bart" />
      </FormContext.Provider>
    );

    const submitAnotherButton = screen.getByRole("button", { name: /submit another/i });
    expect(submitAnotherButton).toBeInTheDocument();

    await userEvent.click(submitAnotherButton);

    expect(mockSubmitAnotherForm).toHaveBeenCalledTimes(1);
  });
});
