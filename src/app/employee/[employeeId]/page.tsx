"use client";

import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import DeleteEmployee from "@/ui/components/DeleteEmployee.component";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import { Pencil } from "lucide-react";
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
      <EmployeeCard employee={employee} />
      <Link
        className="border px-2 py-1 rounded-md"
        href={`/employee/${employee.id}/edit`}
      >
        <Pencil />
      </Link>
      <DeleteEmployee id={employee.id} />
    </>
  );
}
