import { useDeleteEmployeeById } from "@/domain/hooks/useDeleteEmployeeById.hook";
import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import EmployeePage from "./page";

vi.mock("@/domain/hooks/useGetEmployeeById.hook", () => ({
    useGetEmployeeById: vi.fn(),
}));

vi.mock("@/domain/hooks/useDeleteEmployeeById.hook", () => ({
    useDeleteEmployeeById: vi.fn(),
}));

vi.mock("next/navigation", () => ({
    useRouter: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
    ...vi.importActual('@tanstack/react-query'),
    useQueryClient: () => ({
        invalidateQueries: vi.fn(),  // Mock invalidateQueries
    }),
}));

const mockEmployee = {
    id: 1,
    employee_name: "John Doe",
    employee_salary: 60000,
    employee_age: 30,
};

describe("EmployeePage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render employee details and show loading state", () => {
        (useGetEmployeeById as Mock).mockReturnValue({
            data: null,
            isLoading: true,
            isError: false,
        });

        const mutateAsync = vi.fn().mockResolvedValue(true);
        (useDeleteEmployeeById as Mock).mockReturnValue({
            mutateAsync,
            isSuccess: false,
            isPending: false,
        });

        render(<EmployeePage params={{ employeeId: "1" }} />);

        expect(screen.getByText("loading")).toBeDefined();
    });

    it("should render employee details successfully", () => {
        (useGetEmployeeById as Mock).mockReturnValue({
            data: mockEmployee,
            isLoading: false,
            isError: false,
        });

        render(<EmployeePage params={{ employeeId: "1" }} />);

        expect(screen.getAllByText("Employee Details")).toBeDefined();
        expect(screen.getByText(mockEmployee.employee_name)).toBeDefined();
        expect(screen.getByText("Back")).toBeDefined();
        expect(screen.getByText("Edit")).toBeDefined();
        expect(screen.getByText("Delete")).toBeDefined();
    });

    it("should call the delete mutation on button click", async () => {
        const mutateAsync = vi.fn().mockResolvedValue(true);
        (useDeleteEmployeeById as Mock).mockReturnValue({
            mutateAsync,
            isSuccess: false,
            isPending: false,
        });

        (useGetEmployeeById as Mock).mockReturnValue({
            data: mockEmployee,
            isLoading: false,
            isError: false,
        });

        render(<EmployeePage params={{ employeeId: "1" }} />);

        const deleteButton = screen.getAllByText("Delete");
        fireEvent.click(deleteButton[0]);

        await waitFor(() => {
            expect(screen.getByText("Employee data has been removed!")).toBeDefined();
        });
    });

    it("should show success toast on successful delete", async () => {
        const mutateAsync = vi.fn().mockResolvedValue(true);
        (useDeleteEmployeeById as Mock).mockReturnValue({
            mutateAsync,
            isSuccess: true,
            isPending: false,
        });

        (useGetEmployeeById as Mock).mockReturnValue({
            data: mockEmployee,
            isLoading: false,
            isError: false,
        });

        const toastMock = vi.fn();
        vi.stubGlobal('toast', { success: toastMock });

        // Mock useRouter with a mock push function
        const pushMock = vi.fn();
        (useRouter as Mock).mockReturnValue({
            push: pushMock,
        });

        render(<EmployeePage params={{ employeeId: "1" }} />);

        const deleteButton = screen.getAllByText("Delete");
        fireEvent.click(deleteButton[0]);

        await waitFor(() => {
            expect(screen.getByText("Employee data has been removed!")).toBeDefined();
        });
        expect(pushMock).toHaveBeenCalledWith('/');
    });

    it("should show error toast if delete fails", async () => {
        const mutateAsync = vi.fn().mockRejectedValue(new Error("Deletion failed"));
        (useDeleteEmployeeById as Mock).mockReturnValue({
            mutateAsync,
            isSuccess: false,
            isPending: false,
        });

        (useGetEmployeeById as Mock).mockReturnValue({
            data: mockEmployee,
            isLoading: false,
            isError: false,
        });

        render(<EmployeePage params={{ employeeId: "1" }} />);

        const deleteButton = screen.getAllByText("Delete");
        fireEvent.click(deleteButton[0]);

        await waitFor(() => {
            expect(screen.getAllByText("Some issues while removing employee, please try again later")).toBeDefined();
        });
    });

    it("should show error toast if fetching employee data fails", async () => {
        (useGetEmployeeById as Mock).mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
        });

        render(<EmployeePage params={{ employeeId: "1" }} />);

        await waitFor(() => {
            expect(screen.getByText("Some issues while fetching employee, please try again later")).toBeDefined();
        });
    });
});
