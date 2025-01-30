"use client";

import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import { Card, CardContent } from "@/ui/components/card";
import DeleteEmployee from "@/ui/components/DeleteEmployee.component";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import { Skeleton } from "@/ui/components/skeleton";
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
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardContent className="pt-4 flex flex-col gap-4">
            <Skeleton className="rounded-full w-48 h-6" />
            <Skeleton className="rounded-full w-48 h-6" />
          </CardContent>
        </Card>
        <Skeleton className="rounded-full w-24 h-9" />
        <Skeleton className="rounded-full w-24 h-9" />
      </div>
    );
  }

  if (employee === undefined || isError) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <EmployeeCard employee={employee} />
      <Link
        className="w-fit border px-4 py-2 rounded-md flex gap-2"
        href={`/employee/${employee.id}/edit`}
      >
        <Pencil className="w-4" /> Edit Employee
      </Link>
      <DeleteEmployee id={employee.id} fullWidth />
    </div>
  );
}
