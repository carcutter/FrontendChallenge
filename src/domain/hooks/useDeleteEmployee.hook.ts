import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeeIdModel } from "../models/employee.model";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useDeleteEmployee = (
  id: EmployeeIdModel,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => service.deleteEmployeeById(id),
    onSuccess,
  });
};
