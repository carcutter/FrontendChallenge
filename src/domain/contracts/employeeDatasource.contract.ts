import {
  EmployeeIdModel,
  EmployeeListModel,
  EmployeeModel,
} from "../models/employee.model";
import {
  CreateEmployeeParams,
  GetEmployeeByIdParams,
  UpdateEmployeeParams,
} from "../params/employee.param";

export default abstract class EmployeeDatasourceContract {
  public abstract getEmployeeList(): Promise<EmployeeListModel>;
  public abstract createEmployee(
    params: CreateEmployeeParams
  ): Promise<EmployeeModel>;
  public abstract getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel>;
  public abstract updateEmployeeById(
    id: EmployeeIdModel,
    params: UpdateEmployeeParams
  ): Promise<EmployeeModel>;
  public abstract deleteEmployeeById(params: unknown): Promise<EmployeeModel>;
}
