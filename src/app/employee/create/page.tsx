"use client";

import { useCreateEmployee } from "@/domain/hooks/useEmployeeApi.hook";
import EmployeeForm from "@/ui/components/EmployeeForm.component";

export default function EditEmployeePage() {
  const { mutate } = useCreateEmployee();

  return <EmployeeForm title="Create Employee" submit={mutate} />;
}
