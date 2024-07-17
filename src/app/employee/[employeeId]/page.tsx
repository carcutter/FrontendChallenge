"use client";

import { useReadEmployee } from "@/domain/hooks/useEmployeeApi.hook";
import { EmployeeModel } from "@/domain/models/employee.model";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import { useParams } from "next/navigation";

export default function EditEmployeePage() {
  const { employeeId } = useParams();
  const { data, isLoading, isError } = useReadEmployee(Number(employeeId));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error, the call to the API failed</div>;
  return (
    <main>
      <h1>Employee Details</h1>
      <EmployeeCard employee={data as EmployeeModel} />
    </main>
  );
}
