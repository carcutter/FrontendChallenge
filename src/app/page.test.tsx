import { useGetEmployeeList } from '@/domain/hooks/useGetEmployeeList.hook';
import { render, screen } from '@testing-library/react';
import { describe, expect, Mock, test, vi } from 'vitest';
import Page from './page';

vi.mock('@/domain/hooks/useGetEmployeeList.hook', () => ({
  useGetEmployeeList: vi.fn(),
}));

describe('EmployeeList Page', () => {
  test('renders heading correctly', () => {
    (useGetEmployeeList as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    render(<Page />);
    expect(screen.getByRole('heading', { level: 1, name: /Employee List/i })).toBeDefined();
  });

  test('displays loading state when data is loading', () => {
    (useGetEmployeeList as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<Page />);
    expect(screen.getByText(/loading/i)).toBeDefined();
  });

  test('renders employee list when data is available', () => {
    const mockData = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];

    (useGetEmployeeList as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<Page />);

    expect(screen.getByRole('heading', { level: 1, name: 'Employee List (2)' })).toBeDefined();
  });
});