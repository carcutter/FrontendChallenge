"use client";

import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import { useUpdateEmployee } from "@/domain/hooks/useUpdateEmployee.hook";
import {
  UpdateEmployeeParams,
  UpdateEmployeeSchema,
} from "@/domain/params/employee.param";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/ui/components/breadcrumb";
import EmployeeForm from "@/ui/components/EmployeeForm.components";
import { notFound, useRouter } from "next/navigation";

export default function EditEmployeePage({
  params,
}: {
  params: { employeeId: string };
}) {
  const parsedEmployeeId = Number(params.employeeId);
  if (isNaN(parsedEmployeeId)) {
    return notFound();
  }

  const router = useRouter();

  const {
    data: employee,
    isLoading: isGetEmployeeLoading,
    isError: isGetEmployeeError,
  } = useGetEmployeeById({ id: parsedEmployeeId });

  const {
    mutate: updateEmployee,
    isPending,
    isError: isUpdateEmployeeError,
    isSuccess: isUpdateEmployeeSuccess,
  } = useUpdateEmployee(parsedEmployeeId, () => {
    router.push(`/employee/${parsedEmployeeId}`);
  });

  function onSubmit(values: UpdateEmployeeParams) {
    updateEmployee(values);
  }

  if (isGetEmployeeLoading) {
    return <div>Loading...</div>;
  }

  if (employee === undefined || isGetEmployeeError) {
    return notFound();
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
            <BreadcrumbItem>
              <BreadcrumbLink href={`/employee/${params.employeeId}`}>
                {params.employeeId}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Edit</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex h-screen flex-col items-start justify-start p-4">
        <h1>Edit Employee</h1>

        <EmployeeForm
          employee={employee}
          schema={UpdateEmployeeSchema}
          onSubmit={onSubmit}
          disabled={isPending}
        />
      </main>
    </>
  );
}
