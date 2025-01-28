"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { useCreateEmployee } from "@/domain/hooks/useCreateEmployee.hook";
import { EmployeeModel } from "@/domain/models/employee.model";

export default function CreateEmployeePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useCreateEmployee();
  const [formData, setFormData] = useState<Partial<EmployeeModel> | undefined>(undefined);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    mutate({
      employee_age: formData.employee_age || 0,
      employee_salary: formData.employee_salary || 0,
      employee_name: formData.employee_name
    });
  }, [mutate, formData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Congratulations, Employee has been created!');
      queryClient.invalidateQueries({ queryKey: ['getEmployeeList'] });
      router.push('/');
    }
    if (isError) {
      toast.error('Some issues while creating a employee, please try again later');
    }
  }, [isSuccess, isError, router, queryClient]);

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4">
      <h1>Employee Details</h1>
      <div className="flex flex-col gap-2">
        <Link className="border px-2 py-1 rounded-md" href={`/`}>
          Back
        </Link>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Name"
            required
            value={formData?.employee_name}
            onChange={(e) => e.target.value && setFormData({ ...formData, employee_name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            required
            value={formData?.employee_age}
            onChange={(e) => e.target.value && setFormData({ ...formData, employee_age: +e.target.value })}
          />
          <input
            type="number"
            placeholder="Salary"
            required
            value={formData?.employee_salary}
            onChange={(e) => e.target.value && setFormData({ ...formData, employee_salary: +e.target.value })}
          />
          <button type="submit" className="border px-2 py-1 rounded-md" disabled={isPending}>
            Submit
          </button>
        </form>
      </div>
      <ToastContainer theme='dark' position='top-center' />
    </main>
  );
}
