import { useMutation } from "@tanstack/react-query";
import { CreateEmployeeParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: (createEmployeeParams: CreateEmployeeParams) =>
      service.createEmployee(createEmployeeParams),
  });
};
