"use client";

import EmployeeFormatter from "@/core/formatters/employee.formatter";
import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import { Button } from "@/ui/components/button";
import DeleteEmployee from "@/ui/components/DeleteEmployee.component";
import { Skeleton } from "@/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/table";
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isError } = useGetEmployeeList();

  return (
    <>
      <h1 className="text-2xl pb-4">
        Employee List {data && <span>({data.length})</span>}
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name (Id)</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="rounded-full w-24 h-9" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="rounded-full w-24 h-9" />
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Skeleton className="rounded-full w-12 h-9" />
                    <Skeleton className="rounded-full w-12 h-9" />
                  </TableCell>
                </TableRow>
              ))
            : null}
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

      <Button size="icon" variant="ghost">
        <Link
          className="absolute bottom-4 right-4 rounded-full bg-primary p-4 text-primary-foreground hover:bg-primary/80 transition-colors"
          href={`/employee/create`}
        >
          <Plus />
        </Link>
      </Button>
      {!data && !isLoading && isError && (
        <div className="flex-1 w-full items-center justify-center">
          <span>error</span>
        </div>
      )}
    </>
  );
}
