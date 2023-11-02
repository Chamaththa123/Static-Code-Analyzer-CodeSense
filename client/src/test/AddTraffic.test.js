import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import axios from "axios"; // Import axios for mocking
import AddTraffic from "./AddTraffic";

jest.mock("axios"); // Mock the axios module

describe("AddTraffic Component", () => {
  test("renders the AddTraffic component", () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <AddTraffic />
    );

    // Ensure that essential elements are rendered
    expect(getByText("Report Traffic Conditions")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter Bus No")).toBeInTheDocument();
    // Add more expectations for other form elements and labels
  });

  test("Submit button is enabled after filling out the form", () => {
    const { getByText, getByPlaceholderText } = render(<AddTraffic />);
    
    // Fill in form fields
    fireEvent.change(getByPlaceholderText("Enter Bus No"), {
      target: { value: "123" },
    });
    // Add similar fireEvent calls for other form fields
    
    // Assert that the Submit button is enabled
    expect(getByText("Submit")).toBeEnabled();
  });

  test("Submit button is disabled when the form is empty", () => {
    const { getByText } = render(<AddTraffic />);
    
    // Assert that the Submit button is initially disabled
    expect(getByText("Submit")).toBeDisabled();
  });

  test("Error message is displayed when a required field is not filled", () => {
    const { getByText, getByLabelText } = render(<AddTraffic />);
    
    // Submit the form without filling any required field
    fireEvent.click(getByText("Submit"));
    
    // Assert that an error message is displayed
    const errorMessage = getByText("Please fill out this field.");
    expect(errorMessage).toBeInTheDocument();
  });

  test("submits the form successfully", async () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <AddTraffic />
    );

    // Fill in form fields
    fireEvent.change(getByPlaceholderText("Enter Bus No"), {
      target: { value: "123" },
    });
    // Add similar fireEvent calls for other form fields

    // Mock the Axios post request to return a successful response
    axios.post.mockResolvedValue({
      data: { success: true },
    });

    // Submit the form
    fireEvent.click(getByText("Submit"));

    // Assert that the success alert is shown
    const successAlert = await screen.findByText("Submit Traffic Conditions successfully !!");
    expect(successAlert).toBeInTheDocument();

    // Ensure that form fields are cleared
    expect(getByPlaceholderText("Enter Bus No").value).toBe("");
    // Add similar expectations for other form fields
  });

  test("displays an error message on form submission failure", async () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <AddTraffic />
    );

    // Mock the Axios post request to return a failure response
    axios.post.mockRejectedValue(new Error("Submission failed"));

    // Submit the form
    fireEvent.click(getByText("Submit"));

    // Assert that an error message is displayed
    const errorAlert = await screen.findByText("Something Went Wrong!!");
    expect(errorAlert).toBeInTheDocument();
  });

  test("navigates to the AddTraffic page after successful submission", async () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(
      <AddTraffic />
    );

    // Fill in form fields
    fireEvent.change(getByPlaceholderText("Enter Bus No"), {
      target: { value: "123" },
    });
    // Add similar fireEvent calls for other form fields

    // Mock the Axios post request to return a successful response
    axios.post.mockResolvedValue({
      data: { success: true },
    });

    // Submit the form
    fireEvent.click(getByText("Submit"));

    // Assert that the component navigates to the AddTraffic page
    expect(window.alert).toHaveBeenCalledWith("Submit Traffic Conditions successfully !!");
    // You might need to adjust the navigation assertion based on how your app handles navigation
  });
});
