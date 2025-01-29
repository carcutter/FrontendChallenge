import EmployeeDatasource from "@/data/datasources/employee.datasource";
import EmployeeDatasourceContract from "../contracts/employeeDatasource.contract";
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

export default class EmployeeService {
  private static _instance: EmployeeService;
  public static getInstance(): EmployeeService {
    if (!EmployeeService._instance) {
      EmployeeService._instance = new EmployeeService();
    }
    return EmployeeService._instance;
  }

  private constructor(
    private datasource: EmployeeDatasourceContract = new EmployeeDatasource()
  ) {}

  public getEmployeeList(): Promise<EmployeeListModel> {
    return this.datasource.getEmployeeList();
  }
  public createEmployee(params: CreateEmployeeParams): Promise<EmployeeModel> {
    return this.datasource.createEmployee(params);
  }
  public getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel> {
    return this.datasource.getEmployeeById(params);
  }
  public updateEmployeeById(
    id: EmployeeIdModel,
    params: UpdateEmployeeParams
  ): Promise<EmployeeModel> {
    return this.datasource.updateEmployeeById(id, params);
  }
  public deleteEmployeeById(id: EmployeeIdModel): Promise<void> {
    return this.datasource.deleteEmployeeById(id);
  }
}
