import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateEmployeeParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useCreateEmployee = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (createEmployeeParams: CreateEmployeeParams) =>
      service.createEmployee(createEmployeeParams),
    onSuccess: () => {
      toast.success(`Employee created!`);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast.error("Error creating employee");
    },
  });
};
