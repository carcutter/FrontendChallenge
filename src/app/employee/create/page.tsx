"use client";

import { useCreateEmployee } from "@/domain/hooks/useCreateEmployee.hook";
import {
  CreateEmployeeParams,
  CreateEmployeeSchema,
} from "@/domain/params/employee.param";
import { Button } from "@/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/form";
import { Input } from "@/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function EditEmployeePage() {
  const form = useForm<CreateEmployeeParams>({
    resolver: zodResolver(CreateEmployeeSchema),
    defaultValues: {
      employee_name: "",
      employee_salary: 0,
    },
  });
  const {
    mutate: createEmployee,
    isPending,
    isError,
    isSuccess,
  } = useCreateEmployee();

  function onSubmit(values: CreateEmployeeParams) {
    createEmployee(values);
  }

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4">
      <h1 className="text-2xl">Create Employee</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="employee_name"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Name</FormLabel>
                <FormControl>
                  <Input placeholder="Max Mustermann" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employee_salary"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Salary</FormLabel>
                <FormControl>
                  <Input
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
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>

      {isPending ? <span>Pending</span> : null}
      {isSuccess ? <span>Success</span> : null}
      {isError ? <span>Error</span> : null}
    </main>
  );
}
