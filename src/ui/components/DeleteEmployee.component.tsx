import { useDeleteEmployee } from "@/domain/hooks/useDeleteEmployee.hook";
import { EmployeeIdModel } from "@/domain/models/employee.model";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./button";

export interface DeleteEmployeeProps {
  id: EmployeeIdModel;
}

const DeleteEmployee = ({ id }: DeleteEmployeeProps): ReactNode => {
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
    <>
      <Button disabled={isPending} onClick={onClick}>
        Delete
      </Button>
      {isError ? <span>Error</span> : null}
    </>
  );
};
export default DeleteEmployee;
