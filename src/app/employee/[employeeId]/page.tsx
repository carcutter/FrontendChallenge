"use client";

import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeList.hook";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditEmployeePage() {
  const { employeeId } = useParams();
  const id = Number(employeeId);

  const { data: employee, isLoading, isError } = useGetEmployeeById(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !employee) {
    return <div>Error: Unable to fetch employee details</div>;
  }

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      <h1>Employee Details</h1>
      <EmployeeCard employee={employee} />
      <Link
        className="border px-2 py-1 rounded-md"
        href={`/employee/${employee.id}/edit`}
      >
        Edit
      </Link>
    </main>
  );
}
