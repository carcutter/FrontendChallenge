"use client";

import { EmployeeModel } from "@/domain/models/employee.model";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";

export default function EditEmployeePage() {
  // TODO Implement employee details page and delete feature
  const employee: EmployeeModel = {
    id: 2,
    employee_name: "Mock Employee",
    employee_salary: 10_000_000,
  };
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
