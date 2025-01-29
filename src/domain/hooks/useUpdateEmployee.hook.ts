import { useMutation } from "@tanstack/react-query";
import { EmployeeIdModel } from "../models/employee.model";
import { UpdateEmployeeParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useUpdateEmployee = (
  id: EmployeeIdModel,
  onSuccess?: () => void
) => {
  return useMutation({
    mutationFn: (updateEmployeeParams: UpdateEmployeeParams) =>
      service.updateEmployeeById(id, updateEmployeeParams),
    onSuccess,
  });
};
