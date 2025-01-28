import { useGetEmployeeById } from '@/domain/hooks/useGetEmployeeById.hook';
import { useUpdateEmployeeById } from '@/domain/hooks/useUpdateEmployeeById.hook';
import { useQueryClient } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import EditEmployeePage from './page';

// Mock necessary hooks
vi.mock('@/domain/hooks/useGetEmployeeById.hook', () => ({
  useGetEmployeeById: vi.fn(),
}));

vi.mock('@/domain/hooks/useUpdateEmployeeById.hook', () => ({
  useUpdateEmployeeById: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(),
}));

describe('EditEmployeePage', () => {
  const mockEmployee = { id: 1, employee_name: 'John Doe', employee_age: '30', employee_salary: '60000' };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    (useGetEmployeeById as Mock).mockReturnValue({ data: mockEmployee, isLoading: false, isError: false });
    (useUpdateEmployeeById as Mock).mockReturnValue({
      mutateAsync: vi.fn().mockResolvedValue({ id: 1 }),
      isPending: false,
      isSuccess: false,
      isError: false,
    });
    (useQueryClient as Mock).mockReturnValue({ invalidateQueries: vi.fn() });
  });

  it('should render the employee form with initial data', () => {
    render(<EditEmployeePage params={{ employeeId: '1' }} />);

    expect(screen.getAllByPlaceholderText('Name')[0]).toHaveProperty('value', mockEmployee.employee_name);
    expect(screen.getAllByPlaceholderText('Age')[0]).toHaveProperty('value', mockEmployee.employee_age);
    expect(screen.getAllByPlaceholderText('Salary')[0]).toHaveProperty('value', mockEmployee.employee_salary);
  });

  it('should allow form data to be updated', () => {
    render(<EditEmployeePage params={{ employeeId: '1' }} />);

    const nameInput = screen.getAllByPlaceholderText('Name')[0];
    const ageInput = screen.getAllByPlaceholderText('Age')[0];
    const salaryInput = screen.getAllByPlaceholderText('Salary')[0];

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(ageInput, { target: { value: '35' } });
    fireEvent.change(salaryInput, { target: { value: '70000' } });

    expect(nameInput).toHaveProperty('value', 'Jane Doe');
    expect(ageInput).toHaveProperty('value', '35');
    expect(salaryInput).toHaveProperty('value', '70000');
  });

  it('should show success toast on successful update', async () => {
    const mutateAsyncMock = vi.fn().mockResolvedValue({ id: 1 });
    (useUpdateEmployeeById as Mock).mockReturnValue({ mutateAsync: mutateAsyncMock });

    render(<EditEmployeePage params={{ employeeId: '1' }} />);

    fireEvent.change(screen.getAllByPlaceholderText('Name')[0], { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getAllByPlaceholderText('Age')[0], { target: { value: '35' } });
    fireEvent.change(screen.getAllByPlaceholderText('Salary')[0], { target: { value: '70000' } });

    fireEvent.click(screen.getAllByText('Update')[0]);

    await waitFor(() => {
      expect(screen.getByText('Employee data for 1 has been updated!')).toBeDefined();
    });
  });

  it('should show loading state while data is being fetched', () => {
    (useGetEmployeeById as Mock).mockReturnValueOnce({ data: undefined, isLoading: true, isError: false });

    render(<EditEmployeePage params={{ employeeId: '1' }} />);

    expect(screen.getAllByText('loading')[0]).toBeDefined();
  });
});
