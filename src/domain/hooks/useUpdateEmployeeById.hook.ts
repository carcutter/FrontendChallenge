import { useMutation } from "@tanstack/react-query";

import { EmployeeModel } from "../models/employee.model";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useUpdateEmployeeById = () => {
  return useMutation({
    mutationKey: ['useUpdateEmployeeById'],
    mutationFn: (employee: EmployeeModel) => service.updateEmployeeById(employee),
  });
};
