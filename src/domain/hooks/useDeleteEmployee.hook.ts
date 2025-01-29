import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
    onSuccess: () => {
      toast.success(`Employee deleted!`);
      queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("Failed deleting employee");
    },
  });
};
