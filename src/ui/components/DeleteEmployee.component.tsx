import { useDeleteEmployee } from "@/domain/hooks/useDeleteEmployee.hook";
import { EmployeeIdModel } from "@/domain/models/employee.model";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./button";

export interface DeleteEmployeeProps {
  id: EmployeeIdModel;
  fullWidth?: boolean;
}

const DeleteEmployee = ({ id, fullWidth }: DeleteEmployeeProps): ReactNode => {
  const router = useRouter();
  const {
    isPending,
    isError,
    mutate: deleteEmployee,
  } = useDeleteEmployee(id, () => {
    router.push(`/`);
  });

  function onClick() {
    deleteEmployee();
  }

  return (
    <Button disabled={isPending} onClick={onClick} className="w-fit flex gap-2">
      <Trash /> {fullWidth ? "Delete Employee" : null}
    </Button>
  );
};
export default DeleteEmployee;
