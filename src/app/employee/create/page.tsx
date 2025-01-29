"use client";

import { useCreateEmployee } from "@/domain/hooks/useCreateEmployee.hook";
import {
  CreateEmployeeParams,
  CreateEmployeeSchema,
} from "@/domain/params/employee.param";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/ui/components/breadcrumb";
import EmployeeForm from "@/ui/components/EmployeeForm.components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CreateEmployeePage({
  params,
}: {
  params: { employeeId: string };
}) {
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
    <>
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Employees</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Create</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex h-screen flex-col items-start justify-start p-4">
        <h1 className="text-2xl">Create Employee</h1>
        <EmployeeForm
          employee={emptyEmployee}
          schema={CreateEmployeeSchema}
          onSubmit={onSubmit}
          disabled={isPending}
        />

        {isPending ? <span>Pending</span> : null}
        {isSuccess ? <span>Success</span> : null}
        {isError ? <span>Error</span> : null}
      </main>
    </>
  );
}
