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
      const response = await fetch(
        "http://localhost:3001/api/v1/employees",
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json;

      return EmployeeListSchema.parse(data);
    } catch (exception) {
      console.error(exception);
      return undefined;
    }
  }

  public async createEmployee(
    employeeData: Omit<EmployeeModel, "id">, // Ne pas exiger l'ID
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch("http://localhost:3001/api/v1/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        console.error("Failed to create employee:", response.statusText);
        return undefined;
      }

      const json = await response.json();
      return EmployeeSchema.parse(json); // Validation avec Zod
    } catch (exception) {
      console.error("Error creating employee:", exception);
      return undefined;
    }
  }

    public async getEmployeeById(
  params: GetEmployeeByIdParams,
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/employees/${params.id}`,
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json;

      return EmployeeSchema.parse(data); // Utilisation du schéma pour la validation
    } catch (exception) {
      console.error(exception);
      return undefined;
    }
  }

  public async updateEmployeeById(
    params: unknown,
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }

  public deleteEmployeeById(
    params: unknown,
  ): Promise<EmployeeModel | undefined> {
    throw new Error("Method not implemented.");
  }
}
