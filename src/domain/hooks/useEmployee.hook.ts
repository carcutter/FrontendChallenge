import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EmployeeModel } from "../models/employee.model";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeList = (page: number = 1, limit: number = 5) => {
  return useQuery({
    queryKey: ["getEmployeeList", page, limit], // Inclure la pagination dans le cache
    queryFn: () => service.getEmployeeList(page, limit),
  });
};

export const useGetEmployeeById = (id: number) => {
  return useQuery({
    queryKey: ["getEmployeeById", id],
    queryFn: () => service.getEmployeeById({ id }),
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEmployee: Omit<EmployeeModel, "id">) =>
      service.createEmployee(newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] }); // Refresh the list after creation
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedEmployee: { id: number; data: Partial<EmployeeModel> }) =>
      service.updateEmployeeById(updatedEmployee),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] }); // Refresh the global list
      queryClient.invalidateQueries({ queryKey: ["getEmployeeById", variables.id] }); // Refresh employee details
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => service.deleteEmployeeById({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] }); // Update the list after deletion
    },
  });
};
