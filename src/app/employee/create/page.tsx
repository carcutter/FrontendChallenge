"use client";

import { useCreateEmployee } from "@/domain/hooks/useGetEmployeeList.hook";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateEmployeePage() {
  const router = useRouter();
  const { mutate, isPending, isError } = useCreateEmployee();
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeName || !employeeSalary) {
      alert("Please fill in all fields.");
      return;
    }

    mutate(
      {
        employee_name: employeeName,
        employee_salary: Number(employeeSalary),
      },
      {
        onSuccess: () => {
          alert("Employee created successfully!");
          router.push("/"); // Redirige vers la liste des employés
        },
      }
    );
  };

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      <h1 className="text-2xl font-bold">Create Employee</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <label className="flex flex-col">
          <span>Employee Name</span>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="border px-2 py-1 rounded-md text-black bg-white" // Ajout de text-black et bg-white
            placeholder="Enter employee name"
          />
        </label>

        <label className="flex flex-col">
          <span>Salary</span>
          <input
            type="number"
            value={employeeSalary}
            onChange={(e) => setEmployeeSalary(e.target.value)}
            className="border px-2 py-1 rounded-md text-black bg-white" // Ajout de text-black et bg-white
            placeholder="Enter salary"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Employee"}
        </button>
      </form>

      {isError && <p className="text-red-500">Error creating employee.</p>}
    </main>
  );
}
