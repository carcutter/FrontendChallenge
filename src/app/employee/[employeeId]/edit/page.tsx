"use client";

import { useGetEmployeeById, useUpdateEmployee } from "@/domain/hooks/useGetEmployeeList.hook";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditEmployeePage() {
  const { employeeId } = useParams();
  const id = Number(employeeId);
  const router = useRouter();

  // Récupère les infos de l'employé
  const { data: employee, isLoading, isError } = useGetEmployeeById(id);
  const { mutate, isPending, isError: isUpdateError } = useUpdateEmployee();

  // États pour les inputs
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");

  // Remplit les champs une fois les données chargées
  useEffect(() => {
    if (employee) {
      setName(employee.employee_name);
      setSalary(employee.employee_salary.toString());
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { id, data: { employee_name: name, employee_salary: Number(salary) } },
      {
        onSuccess: () => {
          alert("Employee updated successfully!");
          router.push(`/employee/${id}`);
        },
      }
    );
  };

  if (isLoading) return <div>Loading employee details...</div>;
  if (isError) return <div>Error loading employee data.</div>;

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold">Edit Employee</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <label className="flex flex-col">
          <span>Employee Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 rounded-md text-black bg-white"
            placeholder="Enter employee name"
          />
        </label>

        <label className="flex flex-col">
          <span>Salary</span>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="border px-2 py-1 rounded-md text-black bg-white"
            placeholder="Enter salary"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Employee"}
        </button>
      </form>

      {isUpdateError && <p className="text-red-500">Error updating employee.</p>}
    </main>
  );
}
