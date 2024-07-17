// hooks/useEmployeeManagement.js
import {
  useDeleteEmployee,
  useGetEmployeeList,
} from "@/domain/hooks/useEmployeeApi.hook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EmployeeModel } from "../models/employee.model";
export enum EmployeeFilterEnum {
  ID = "id",
  NAME = "employee_name",
  SALARY = "employee_salary",
}

export const useEmployeeManagement = () => {
  const { data, isLoading, isError } = useGetEmployeeList();
  const { mutate: deleteUser } = useDeleteEmployee();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredEmployees, setFilteredEmployees] = useState<
    Partial<EmployeeModel[]>
  >(data || []);
  const [sortType, setSortType] = useState(EmployeeFilterEnum.ID);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    if (data && !isLoading) {
      filterAndSortEmployees();
    }
  }, [data, isLoading, searchQuery, sortType, sortAscending]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filterAndSortEmployees = () => {
    let filtered;
    if (searchQuery === "") {
      filtered = data;
    } else {
      // Continue to filter based on search query
      filtered = data?.filter(
        (emp) =>
          emp?.employee_name.toLowerCase().includes(searchQuery) ||
          emp?.employee_salary.toString().includes(searchQuery)
      );
    }
    setFilteredEmployees(sortEmployees(filtered as EmployeeModel[]));
  };

  const sortEmployees = (employees: EmployeeModel[]) => {
    if (!sortType) return employees;
    return employees?.sort((a, b) => {
      let keyA = a[sortType];
      let keyB = b[sortType];
      if (sortType !== "id") {
        // Assuming non-numeric sorting needs to be case insensitive
        keyA = typeof keyA === "string" ? keyA.toLowerCase() : keyA;
        keyB = typeof keyB === "string" ? keyB.toLowerCase() : keyB;
      }
      if (keyA < keyB) return sortAscending ? -1 : 1;
      if (keyA > keyB) return sortAscending ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (type: EmployeeFilterEnum) => {
    if (type === sortType) {
      setSortAscending(!sortAscending); // Toggle the direction if same sort type is clicked
    } else {
      setSortType(type);
      setSortAscending(true); // Set ascending as default for a new sort type
    }
  };

  const handleDelete = (employee: EmployeeModel) => {
    deleteUser(employee?.id);
  };

  const handleEdit = (employee: EmployeeModel) => {
    router.push(`/employee/${employee.id}/edit`);
  };

  return {
    filteredEmployees,
    isLoading,
    isError,
    handleSearch,
    handleSort,
    handleDelete,
    handleEdit,
    sortType,
    sortAscending,
    searchQuery,
  };
};
