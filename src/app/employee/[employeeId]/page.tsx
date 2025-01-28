"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

import { useDeleteEmployeeById } from "@/domain/hooks/useDeleteEmployeeById.hook";
import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import EmployeeCard from "@/ui/components/EmployeeCard.component";

type params = {
  params: { employeeId: string }
}

export default function EmployeePage({ params }: params) {
  const { employeeId } = params;
  const { data: employee, isLoading, isError } = useGetEmployeeById({ id: +employeeId });
  const { mutateAsync, isSuccess, isPending } = useDeleteEmployeeById();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleDelete = useCallback(() => {
    mutateAsync({ id: +employeeId })
      .then(response => {
        if (response) {
          toast.success('Employee data has been removed!');
        }
        return toast.error('Some issues while removing employee, please try again later');
      });
  }, [mutateAsync, employeeId]);

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['getEmployeeList'] });
      router.push('/');
    }
    if (isError) {
      toast.error('Some issues while fetching employee, please try again later');
    }
  }, [isSuccess, router, isError, queryClient]);

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      <h1>Employee Details</h1>
      {
        employee && (
          <div className="flex flex-col gap-2">
            <Link className="border px-2 py-1 rounded-md text-center" href={`/`}>
              Back
            </Link>
            <EmployeeCard employee={employee} />
            <Link
              className="border px-2 py-1 rounded-md text-center"
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
