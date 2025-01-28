import { useQuery } from "@tanstack/react-query";
import { GetEmployeeByIdParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeById = (
  getEmployeeByIdParams: GetEmployeeByIdParams
) => {
  return useQuery({
    queryKey: ["getEmployee"],
    queryFn: () => service.getEmployeeById(getEmployeeByIdParams),
  });
};
