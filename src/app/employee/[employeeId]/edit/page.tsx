"use client";

import { useUpdateEmployee } from "@/domain/hooks/useEmployeeApi.hook";
import EmployeeForm from "@/ui/components/EmployeeForm.component";

export default function EditEmployeePage() {
  const { mutate } = useUpdateEmployee();

  return <EmployeeForm title="Edit Employee" submit={mutate} />;
}
