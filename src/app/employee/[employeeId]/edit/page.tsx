"use client";

import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import { useUpdateEmployee } from "@/domain/hooks/useUpdateEmployee.hook";
import {
  UpdateEmployeeParams,
  UpdateEmployeeSchema,
} from "@/domain/params/employee.param";
import { Card, CardContent, CardFooter } from "@/ui/components/card";
import EmployeeForm from "@/ui/components/EmployeeForm.components";
import { Skeleton } from "@/ui/components/skeleton";
import { notFound, useRouter } from "next/navigation";

export default function EditEmployeePage({
  params,
}: {
  params: { employeeId: string };
}) {
  const parsedEmployeeId = Number(params.employeeId);
  if (isNaN(parsedEmployeeId)) {
    return notFound();
  }

  const router = useRouter();

  const {
    data: employee,
    isLoading: isGetEmployeeLoading,
    isError: isGetEmployeeError,
  } = useGetEmployeeById({ id: parsedEmployeeId });

  const {
    mutate: updateEmployee,
    isPending,
    isError: isUpdateEmployeeError,
    isSuccess: isUpdateEmployeeSuccess,
  } = useUpdateEmployee(parsedEmployeeId, () => {
    router.push(`/employee/${parsedEmployeeId}`);
  });

  function onSubmit(values: UpdateEmployeeParams) {
    updateEmployee(values);
  }

  if (isGetEmployeeLoading) {
    return (
      <Card>
        <CardContent className="pt-4 flex flex-col gap-4">
          <Skeleton className="rounded-full w-64 h-6" />
          <Skeleton className="rounded-full w-64 h-6" />
        </CardContent>
        <CardFooter>
          <Skeleton className="rounded-full w-16 h-9" />
        </CardFooter>
      </Card>
    );
  }

  if (employee === undefined || isGetEmployeeError) {
    return notFound();
  }

  return (
    <EmployeeForm
      employee={employee}
      schema={UpdateEmployeeSchema}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
