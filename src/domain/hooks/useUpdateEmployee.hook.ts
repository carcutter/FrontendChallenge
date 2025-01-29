import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmployeeIdModel } from "../models/employee.model";
import { UpdateEmployeeParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useUpdateEmployee = (
  id: EmployeeIdModel,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updateEmployeeParams: UpdateEmployeeParams) =>
      service.updateEmployeeById(id, updateEmployeeParams),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`getEmployee-${id}`] });
      if (onSuccess) onSuccess();
    },
  });
};
