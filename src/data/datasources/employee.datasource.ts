import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
  EmployeeSchema,
} from "@/domain/models/employee.model";
import { GetEmployeeByIdParams } from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  private BASE_URL = "http://localhost:3001/api/v1/employees"; // URL de base de l'API

  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(this.BASE_URL);

      if (!response.ok) return undefined;

      const json = await response.json();
      return EmployeeListSchema.parse(json);
    } catch (exception) {
      console.error("Error fetching employee list:", exception);
      return undefined;
    }
  }

  public async createEmployee(
    employeeData: Omit<EmployeeModel, "id">,
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(this.BASE_URL, {
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
      return EmployeeSchema.parse(json);
    } catch (exception) {
      console.error("Error creating employee:", exception);
      return undefined;
    }
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams,
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(`${this.BASE_URL}/${params.id}`);

      if (!response.ok) return undefined;

      const json = await response.json();
      return EmployeeSchema.parse(json);
    } catch (exception) {
      console.error(`Error fetching employee ID ${params.id}:`, exception);
      return undefined;
    }
  }

  public async updateEmployeeById(
    params: { id: number; data: Partial<EmployeeModel> },
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(`${this.BASE_URL}/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params.data),
      });

      if (!response.ok) {
        console.error(`Failed to update employee ${params.id}:`, response.statusText);
        return undefined;
      }

      const json = await response.json();
      return EmployeeSchema.parse(json);
    } catch (exception) {
      console.error(`Error updating employee ID ${params.id}:`, exception);
      return undefined;
    }
  }

  public async deleteEmployeeById(
    params: { id: number },
    ): Promise<EmployeeModel | undefined> {
      try {
        const response = await fetch(`${this.BASE_URL}/${params.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          console.error(`Failed to delete employee ${params.id}:`, response.statusText);
          return undefined;
        }

        // Vérifier si l'API retourne l'employé supprimé
        const json = await response.json();
        return EmployeeSchema.parse(json);
      } catch (exception) {
        console.error(`Error deleting employee ID ${params.id}:`, exception);
        return undefined;
      }
    }

}
