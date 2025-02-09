"use client";

import { useDeleteEmployee, useGetEmployeeById } from "@/domain/hooks/useGetEmployeeList.hook";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function EditEmployeePage() {
  const { employeeId } = useParams();
  const id = Number(employeeId);
  const router = useRouter();

  const { data: employee, isLoading, isError } = useGetEmployeeById(id);
  const { mutate: deleteEmployee, isPending: isDeleting } = useDeleteEmployee();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee?.employee_name}?`)) {
      deleteEmployee(id, {
        onSuccess: () => {
          alert("Employee deleted successfully!");
          router.push("/"); // Redirige vers la liste des employés après suppression
        },
      });
    }
  };

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
      
      <div className="flex gap-4">
        <Link
          className="border px-2 py-1 rounded-md bg-blue-500 text-white"
          href={`/employee/${employee.id}/edit`}
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="border px-2 py-1 rounded-md bg-red-500 text-white"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </main>
  );
}
