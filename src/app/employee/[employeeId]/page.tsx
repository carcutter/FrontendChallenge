"use client";

import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/ui/components/breadcrumb";
import DeleteEmployee from "@/ui/components/DeleteEmployee.component";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function EmployeePage({
  params,
}: {
  params: { employeeId: string };
}) {
  const parsedEmployeeId = Number(params.employeeId);
  if (isNaN(parsedEmployeeId)) {
    return notFound();
  }

  const {
    data: employee,
    isLoading,
    isError,
  } = useGetEmployeeById({ id: parsedEmployeeId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (employee === undefined || isError) {
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
            <BreadcrumbItem>
              <BreadcrumbLink href={`/employee/${employee.id}`}>
                {employee.employee_name} ({employee.id})
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
        <h1>Employee Details</h1>
        <EmployeeCard employee={employee} />
        <Link
          className="border px-2 py-1 rounded-md"
          href={`/employee/${employee.id}/edit`}
        >
          Edit
        </Link>
        <DeleteEmployee id={employee.id} />
      </main>
    </>
  );
}
