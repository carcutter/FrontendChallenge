import EmployeeFormatter from "@/core/formatters/employee.formatter";
import { EmployeeModel } from "@/domain/models/employee.model";
import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "./card";

export interface EmployeeCardProps {
  employee: EmployeeModel;
}

const EmployeeCard = ({ employee }: EmployeeCardProps): ReactNode => {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <span>
          <span className="font-bold text-xl">{employee.employee_name}</span>{" "}
          (Id: {employee.id})
        </span>
        <span className="flex gap-2">
          <span className="font-bold">Salary: </span>
          {EmployeeFormatter.formatSalary(employee.employee_salary)}
        </span>
      </CardHeader>
      <CardContent className="pt-4 flex flex-col gap-4"></CardContent>
    </Card>
  );
};
export default EmployeeCard;
