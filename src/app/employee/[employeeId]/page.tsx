"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

import { useDeleteEmployeeById } from "@/domain/hooks/useDeleteEmployeeById.hook";
import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import EmployeeCard from "@/ui/components/EmployeeCard.component";

export default function EditEmployeePage({ employeeId }: { employeeId: string }) {
  const { data: employee, isLoading, isError } = useGetEmployeeById({ id: +employeeId });
  const { mutate, isSuccess, isError: isDeleteError, isPending } = useDeleteEmployeeById({ id: +employeeId });
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleDelete = useCallback(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Employee data has been removed!');
      queryClient.invalidateQueries({ queryKey: ['getEmployeeList'] });
      router.push('/');
    }
    if (isDeleteError) {
      toast.error('Some issues while removing employee, please try again later');
    }
    if (isError) {
      toast.error('Some issues while fetching employee, please try again later');
    }
  }, [isSuccess, router, isDeleteError, isError]);

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      {
        employee && (
          <div className="flex flex-col gap-2">
            <Link className="border px-2 py-1 rounded-md" href={`/`}>
              Back
            </Link>
            <EmployeeCard employee={employee} />
            <Link
              className="border px-2 py-1 rounded-md"
              href={`/employee/${employee.id}/edit`}
            >
              Edit
            </Link>
            <button
              className="border px-2 py-1 rounded-md"
              onClick={handleDelete}
              disabled={isPending}
            >
              Delete
            </button>
          </div>
        )
      }

      {isLoading && (
        <div className="flex-1 w-full items-center justify-center">
          <span>loading</span>
        </div>
      )}
      <ToastContainer theme='dark' position='top-center' />
    </main>
  );
}
