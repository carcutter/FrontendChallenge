import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeIdModel,
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
  EmployeeSchema,
} from "@/domain/models/employee.model";
import { getResponseSchema } from "@/domain/models/response.model";
import {
  CreateEmployeeParams,
  GetEmployeeByIdParams,
  UpdateEmployeeParams,
} from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  // public baseUrl = "https://dummy.restapiexample.com/api/v1/employees";
  public baseUrl = "http://localhost:4000/api/v1";

  public async getEmployeeList(): Promise<EmployeeListModel> {
    const response = await fetch(`${this.baseUrl}/employees`);

    if (response.status !== 200) {
      throw new Error("Failed");
    }

    const json = await response.json();

    return getResponseSchema(EmployeeListSchema).parse(json).data;
  }

  public async createEmployee(
    params: CreateEmployeeParams
  ): Promise<EmployeeModel> {
    const response = await fetch(`${this.baseUrl}/employees`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (response.status !== 201) {
      throw new Error("Failed");
    }

    const json = await response.json();

    return getResponseSchema(EmployeeSchema).parse(json).data;
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel> {
    const response = await fetch(`${this.baseUrl}/employees/${params.id}`);

    if (response.status !== 200) {
      throw new Error("Failed");
    }

    const json = await response.json();

    return getResponseSchema(EmployeeSchema).parse(json).data;
  }

  public async updateEmployeeById(
    id: EmployeeIdModel,
    params: UpdateEmployeeParams
  ): Promise<EmployeeModel> {
    const response = await fetch(`${this.baseUrl}/employees/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (response.status !== 200) {
      throw new Error("Failed");
    }

    const json = await response.json();

    return getResponseSchema(EmployeeSchema).parse(json).data;
  }

  public deleteEmployeeById(
    params: unknown,
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }
}
