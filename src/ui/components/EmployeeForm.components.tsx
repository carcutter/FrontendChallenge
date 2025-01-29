import { EmployeeModel } from "@/domain/models/employee.model";
import {
  CreateEmployeeParams,
  UpdateEmployeeParams,
} from "@/domain/params/employee.param";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./button";
import { Card, CardContent, CardFooter } from "./card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";

export interface EmployeeFormProps {
  employee: EmployeeModel;
  schema: z.ZodType<UpdateEmployeeParams | CreateEmployeeParams>;
  onSubmit: (values: UpdateEmployeeParams | CreateEmployeeParams) => void;
  disabled: boolean;
}

const EmployeeForm = ({
  employee,
  schema,
  onSubmit,
  disabled,
}: EmployeeFormProps): ReactNode => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: employee,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-4 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="employee_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={disabled}
                      placeholder="Max Mustermann"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employee_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Salary</FormLabel>
                  <FormControl>
                    <Input
                      disabled={disabled}
                      type="number"
                      placeholder="ex. 70000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={disabled}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
export default EmployeeForm;
