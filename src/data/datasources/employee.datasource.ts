import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
  EmployeeSchema,
} from "@/domain/models/employee.model";
import { GetEmployeeByIdParams } from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch("/api/v1/employees");

      // Set cookie in the entry point
      if (response.status === 409) {
        response.text().then((html) => {
          const container = document.createElement("div");
          container.innerHTML = html;

          const script = container.querySelector("script");
          if (script) {
            eval(script.textContent as string);
          } else {
            throw new Error("No script found in the response");
          }
        });
      }

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

  public async createEmployee(params: Partial<EmployeeModel>): Promise<EmployeeModel | undefined> {
    const response = await fetch(`/api/v1/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (response.status !== 200) {
      return undefined;
    }

    const json = await response.json();
    const data = json["data"];

    return EmployeeSchema.parse(data);
  }

  public async getEmployeeById(params: GetEmployeeByIdParams): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(`/api/v1/employee/${params.id}`);

      if (response.status !== 200) {
        return undefined;
      }

      const json = await response.json();
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async updateEmployeeById(params: Partial<EmployeeModel>): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(`/api/v1/update/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (response.status !== 200)
        return undefined;

      const json = await response.json();
      const data = json["data"];

      return EmployeeSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async deleteEmployeeById(params: GetEmployeeByIdParams): Promise<string | undefined> {
    try {
      const response = await fetch(`/api/v1/delete/${params.id}`, {
        method: 'DELETE'
      });

      if (response.status !== 200) {
        return undefined;
      }

      const json = await response.json();

      return json.status;
    } catch (exception) {
      return undefined;
    }
  }
}