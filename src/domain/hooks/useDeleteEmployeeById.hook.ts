import { useMutation } from "@tanstack/react-query";

import { GetEmployeeByIdParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useDeleteEmployeeById = (param: GetEmployeeByIdParams) => {
  return useMutation({
    mutationKey: ["deleteEmployeeById", param.id],
    mutationFn: () => service.deleteEmployeeById(param),
  });
};
