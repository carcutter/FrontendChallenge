import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EmployeeModel } from "../models/employee.model";
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

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEmployee: Omit<EmployeeModel, "id">) =>
      service.createEmployee(newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] }); // Rafraîchit la liste après création
    },
  });
};