import { EmployeeSalaryModel } from "@/domain/models/employee.model";

export default class EmployeeFormatter {
  public static formatSalary(salary: EmployeeSalaryModel): string {
    return `~${Math.floor(salary)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`;
  }
}
