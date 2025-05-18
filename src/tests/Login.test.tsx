import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../components/Login";
import { FormProvider, useForm } from "react-hook-form";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("Login Form Validation", () => {
  it("displays validation errors when required fields are empty", async () => {
    render(
      <Wrapper>
        <Login />
      </Wrapper>
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(submitButton);

    const errorMessages = await screen.findAllByText(/required/i);

    expect(errorMessages).toHaveLength(2);
  });
});
