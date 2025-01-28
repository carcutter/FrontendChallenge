"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import { useUpdateEmployeeById } from "@/domain/hooks/useUpdateEmployeeById.hook";
import { EmployeeModel } from "@/domain/models/employee.model";

type params = {
  params: { employeeId: string }
}

export default function EditEmployeePage({ params }: params) {
  const { employeeId } = params;
  const { data: employee, isLoading, isError } = useGetEmployeeById({ id: +employeeId });
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<EmployeeModel | undefined>(employee);
  const { mutateAsync, isPending, isSuccess, isError: isErrorInUpdate } = useUpdateEmployeeById();

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
    if (isError) {
      toast.error('Error while fetching employees data')
    }
  }, [employee, isError]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    if (!formData) return;

    e.preventDefault();

    mutateAsync(formData)
      .then(response => {
        if (response) {
          return toast.success(`Employee data for ${employeeId} has been updated!`)
        }
        return toast.error(`Error! Employee data for ${employeeId} can not be update, please try again later.`)
      });
  }, [mutateAsync, formData, employeeId]);

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['getEmployeeById', employeeId] });
      queryClient.invalidateQueries({ queryKey: ['getEmployeeList'] });
    }
  }, [isSuccess, employeeId, queryClient]);

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4">
      <h1>Edit Employee Details</h1>
      <div className="flex flex-col gap-2">
        <Link className="border px-2 py-1 rounded-md text-center" href={`/employee/${employeeId}`}>
          Back
        </Link>
        {
          formData && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Name"
                value={formData?.employee_name}
                onChange={(e) => formData && setFormData({ ...formData, employee_name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Age"
                value={formData?.employee_age}
                onChange={(e) => formData && setFormData({ ...formData, employee_age: +e.target.value })}
              />
              <input
                type="number"
                placeholder="Salary"
                value={formData?.employee_salary}
                onChange={(e) => formData && setFormData({ ...formData, employee_salary: +e.target.value })}
              />
              <button className="border px-2 py-1 rounded-md" type="submit" disabled={isPending}>
                Update
              </button>
            </form>
          )}
      </div>
      {isLoading && (
        <div className="flex-1 w-full items-center justify-center">
          <span>loading</span>
        </div>
      )}
      <ToastContainer theme='dark' position='top-center' />
    </main>
  );
}
