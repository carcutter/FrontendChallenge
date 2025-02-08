import { useQuery } from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeList = () => {
  return useQuery({
    queryKey: ["getEmployeeList"],
    queryFn: () => service.getEmployeeList(),
  });
};

export const useGetEmployeeById = (id: number) => {
  return useQuery({
    queryKey: ["getEmployeeById", { id }],
    queryFn: () => service.getEmployeeById({ id }),
  });
};
