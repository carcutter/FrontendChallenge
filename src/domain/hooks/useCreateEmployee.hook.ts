import { useMutation } from "@tanstack/react-query";

import { EmployeeModel } from "../models/employee.model";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: (employee: Partial<EmployeeModel>) => service.createEmployee(employee),
  });
};