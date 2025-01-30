import { useDeleteEmployee } from "@/domain/hooks/useDeleteEmployee.hook";
import { EmployeeIdModel } from "@/domain/models/employee.model";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending} className="w-fit flex gap-2">
          <Trash /> {fullWidth ? "Delete Employee" : null}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            employee.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteEmployee;
