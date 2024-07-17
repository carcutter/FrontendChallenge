import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toast";
import { UpsertEmployeeParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeList = () => {
  return useQuery({
    queryKey: ["getEmployeeList"],
    queryFn: () => service.getEmployeeList(),
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employee: UpsertEmployeeParams) =>
      service.updateEmployeeById(employee),
    onMutate: async (employee) => {
      await queryClient.cancelQueries({ queryKey: ["getEmployeeList"] });
      const previousEmployeeList = queryClient.getQueryData([
        "getEmployeeList",
      ]);
      queryClient.setQueryData(["getEmployeeList"], (oldData: any) => {
        const updatedList = oldData?.map((emp: any) => {
          if (emp.id === employee.id) {
            return {
              id: employee.id,
              employee_name: employee.name,
              employee_salary: employee.salary,
            };
          }
          return emp;
        });
        return updatedList;
      });
      return { previousEmployeeList };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] });
      toast("Employee updated successfully", {
        backgroundColor: "#8329C5",
        color: "#ffffff",
      });
    },
    onError: async (error, variables, context) => {
      console.log(
        "error, previousEmployeeList has been restored, despite the error"
      );
      toast("Failed to update employee, however the data has been mutated", {
        backgroundColor: "#FF0000",
        color: "#ffffff",
      });
    },
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employee: UpsertEmployeeParams) =>
      service.createEmployee(employee),
    onMutate: async (employee) => {
      await queryClient.cancelQueries({ queryKey: ["getEmployeeList"] });
      const previousEmployeeList = queryClient.getQueryData([
        "getEmployeeList",
      ]);
      queryClient.setQueryData(["getEmployeeList"], (oldData: any) => {
        const updatedList = [
          ...oldData,
          {
            id: oldData.length + 1,
            employee_name: employee.name,
            employee_salary: employee.salary,
          },
        ];
        return updatedList;
      });
      return { previousEmployeeList };
    },
    onSuccess: async () => {
      //await queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] });
      toast("Employee created successfully, data has been mutated", {
        backgroundColor: "#8329C5",
        color: "#ffffff",
      });
    },
    onError: async (error, variables, context) => {
      toast("Failed to create employee, however the data has been mutated", {
        backgroundColor: "#FF0000",
        color: "#ffffff",
      });
    },
  });
};

export const useReadEmployee = (employeeId: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["readEmployee", employeeId],
    queryFn: () => service.getEmployeeById({ id: employeeId }),
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employeeId: number) =>
      service.deleteEmployeeById({ id: employeeId }),
    onMutate: async (employeeId) => {
      await queryClient.cancelQueries({ queryKey: ["getEmployeeList"] });
      const previousEmployeeList = queryClient.getQueryData([
        "getEmployeeList",
      ]);
      queryClient.setQueryData(["getEmployeeList"], (oldData: any) => {
        const updatedList = oldData?.filter(
          (emp: any) => emp.id !== employeeId
        );
        return updatedList;
      });
      return { previousEmployeeList };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getEmployeeList"] });
      toast("Employee deleted successfully", {
        backgroundColor: "#8329C5",
        color: "#ffffff",
      });
    },
    onError: async (error, variables, context) => {
      toast("Failed to delete employee, however the data has been mutated", {
        backgroundColor: "#FF0000",
        color: "#ffffff",
      });
    },
  });
};
