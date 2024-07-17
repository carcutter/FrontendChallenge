import { z } from "zod";
import { EmployeeIdSchema } from "../models/employee.model";

export const GetEmployeeByIdSchema = z.object({
  id: EmployeeIdSchema,
});
export type GetEmployeeByIdParams = z.infer<typeof GetEmployeeByIdSchema>;

export type DeleteEmployeeByIdParams = GetEmployeeByIdParams;

export const UpsertEmployeeSchema = z.object({
  id: EmployeeIdSchema,
  name: z.string().min(1),
  salary: z.number().positive(),
});
export type UpsertEmployeeParams = z.infer<typeof UpsertEmployeeSchema>;
