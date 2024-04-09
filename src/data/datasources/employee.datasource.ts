import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
} from "@/domain/models/employee.model";
import { GetEmployeeByIdParams } from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/employees"
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeListSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async createEmployee(
    params: unknown
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }

  public async updateEmployeeById(
    params: unknown
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }

  public deleteEmployeeById(
    params: unknown
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }
}
