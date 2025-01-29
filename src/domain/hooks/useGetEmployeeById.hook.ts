import { useQuery } from "@tanstack/react-query";
import { GetEmployeeByIdParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeById = (
  getEmployeeByIdParams: GetEmployeeByIdParams
) => {
  return useQuery({
    queryKey: [`getEmployee-${getEmployeeByIdParams.id}`],
    queryFn: () => service.getEmployeeById(getEmployeeByIdParams),
  });
};
