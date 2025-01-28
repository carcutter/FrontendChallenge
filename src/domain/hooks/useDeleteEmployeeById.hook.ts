import { useMutation } from "@tanstack/react-query";

import { GetEmployeeByIdParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useDeleteEmployeeById = () => {
  return useMutation({
    mutationKey: ["deleteEmployeeById"],
    mutationFn: (param: GetEmployeeByIdParams) => service.deleteEmployeeById(param)
  });
};
