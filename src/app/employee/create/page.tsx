"use client";

import { useCreateEmployee } from "@/domain/hooks/useCreateEmployee.hook";
import {
  CreateEmployeeParams,
  CreateEmployeeSchema,
} from "@/domain/params/employee.param";
import EmployeeForm from "@/ui/components/EmployeeForm.components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CreateEmployeePage({
  params,
}: {
  params: { employeeId: string };
}) {
  // This should probably be a constant where the data structure is defined
  const emptyEmployee = {
    id: 0,
    employee_name: "",
    employee_salary: 0,
  };

  const router = useRouter();

  const form = useForm<CreateEmployeeParams>({
    resolver: zodResolver(CreateEmployeeSchema),
    defaultValues: emptyEmployee,
  });

  const {
    mutate: createEmployee,
    isPending,
    isError,
    isSuccess,
  } = useCreateEmployee(() => {
    router.push(`/`);
  });

  function onSubmit(values: CreateEmployeeParams) {
    createEmployee(values);
  }

  return (
    <EmployeeForm
      employee={emptyEmployee}
      schema={CreateEmployeeSchema}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
