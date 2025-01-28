import { useQuery } from "@tanstack/react-query";
import { EmployeeIdModel } from "../models/employee.model";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeById = (id: EmployeeIdModel) => {
  return useQuery({
    queryKey: ["getEmployee"],
    queryFn: () => service.getEmployeeById({ id }),
  });
};
