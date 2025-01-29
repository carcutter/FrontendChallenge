"use client";

import EmployeeFormatter from "@/core/formatters/employee.formatter";
import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import { Button } from "@/ui/components/button";
import DeleteEmployee from "@/ui/components/DeleteEmployee.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/table";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isError } = useGetEmployeeList();

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      <h1 className="text-2xl">
        Employee List {data && <span>({data.length})</span>}
      </h1>
      <Link href={`/employee/create`}>
        <Button variant="outline">Create</Button>
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name (Id)</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((employee, index) => (
            <TableRow key={employee.id}>
              <TableCell className="underline">
                <Link href={`/employee/${employee.id}`}>
                  {employee.employee_name} ({employee.id})
                </Link>
              </TableCell>
              <TableCell>
                {EmployeeFormatter.formatSalary(employee.employee_salary)}
              </TableCell>
              <TableCell className="flex gap-2">
                <Link href={`/employee/${employee.id}/edit`}>
                  <Button variant="outline">
                    <Pencil />
                  </Button>
                </Link>
                <DeleteEmployee id={employee.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data && <ol className="flex flex-col gap-2"></ol>}

      {isLoading && (
        <div className="flex-1 w-full items-center justify-center">
          <span>loading</span>
        </div>
      )}
      {!data && !isLoading && isError && (
        <div className="flex-1 w-full items-center justify-center">
          <span>error</span>
        </div>
      )}
    </main>
  );
}
