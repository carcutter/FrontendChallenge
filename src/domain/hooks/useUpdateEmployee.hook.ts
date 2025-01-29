import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
      toast.success("Employee updated!");
      queryClient.invalidateQueries({ queryKey: [`getEmployee-${id}`] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("Failed updating employee");
    },
  });
};
