import { useCreateEmployee } from "@/domain/hooks/useCreateEmployee.hook";
import { useQueryClient } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import CreateEmployeePage from "./page";

// Mocking dependencies
vi.mock("@tanstack/react-query", () => ({
    useQueryClient: vi.fn(),
}));
vi.mock("next/navigation", () => ({
    useRouter: vi.fn(),
}));
vi.mock("@/domain/hooks/useCreateEmployee.hook", () => ({
    useCreateEmployee: vi.fn(),
}));

describe("CreateEmployeePage", () => {
    const mockMutate = vi.fn();
    const mockInvalidateQueries = vi.fn();
    const mockPush = vi.fn();

    beforeEach(() => {
        // Reset mocks
        vi.clearAllMocks();

        // Mock implementations
        (useCreateEmployee as Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isSuccess: false,
            isError: false,
        });
        (useQueryClient as Mock).mockReturnValue({
            invalidateQueries: mockInvalidateQueries,
        });
        (useRouter as Mock).mockReturnValue({
            push: mockPush,
        });
    });

    it("should render the form and input fields correctly", () => {
        render(<CreateEmployeePage />);
        expect(screen.getAllByPlaceholderText("Name")[0]).toBeDefined();
        expect(screen.getAllByPlaceholderText("Age")[0]).toBeDefined();
        expect(screen.getAllByPlaceholderText("Salary")[0]).toBeDefined();
        expect(screen.getAllByText("Submit")[0]).toBeDefined();
    });

    it("should update input values on change", () => {
        render(<CreateEmployeePage />);
        const nameInput = screen.getAllByPlaceholderText("Name")[0] as HTMLInputElement;
        const ageInput = screen.getAllByPlaceholderText("Age")[0] as HTMLInputElement;
        const salaryInput = screen.getAllByPlaceholderText("Salary")[0] as HTMLInputElement;

        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(ageInput, { target: { value: "30" } });
        fireEvent.change(salaryInput, { target: { value: "50000" } });

        expect(nameInput.value).toBe("John Doe");
        expect(ageInput.value).toBe("30");
        expect(salaryInput.value).toBe("50000");
    });

    it("should call mutate when the form is submitted", async () => {
        render(<CreateEmployeePage />);
        const nameInput = screen.getAllByPlaceholderText("Name")[0] as HTMLInputElement;
        const ageInput = screen.getAllByPlaceholderText("Age")[0] as HTMLInputElement;
        const salaryInput = screen.getAllByPlaceholderText("Salary")[0] as HTMLInputElement;
        const submitButton = screen.getAllByText("Submit")[0] as HTMLButtonElement;

        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(ageInput, { target: { value: "30" } });
        fireEvent.change(salaryInput, { target: { value: "50000" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledWith({
                employee_name: "John Doe",
                employee_age: 30,
                employee_salary: 50000,
            });
        });
    });

    it("should show success toast and redirect on successful creation", async () => {
        (useCreateEmployee as Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isSuccess: true,
            isError: false,
        });

        render(<CreateEmployeePage />);
        render(<ToastContainer />);

        await waitFor(() => {
            expect(screen.getAllByText("Congratulations, Employee has been created!")[0]).toBeDefined();
            expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ["getEmployeeList"] });
            expect(mockPush).toHaveBeenCalledWith("/");
        });
    });

    it("should show error toast on failure", async () => {
        (useCreateEmployee as Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isSuccess: false,
            isError: true,
        });

        render(<CreateEmployeePage />);
        render(<ToastContainer />);

        await waitFor(() => {
            expect(screen.getAllByText("Some issues while creating a employee, please try again later")[0]).toBeDefined();
        });
    });

    it("should disable the submit button while the mutation is pending", () => {
        (useCreateEmployee as Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: true,
            isSuccess: false,
            isError: false,
        });

        render(<CreateEmployeePage />);
        const submitButton = screen.getAllByText("Submit")[0];

        expect((submitButton as HTMLButtonElement).disabled);
    });
});
