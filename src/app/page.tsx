"use client";

import EmployeeFormatter from "@/core/formatters/employee.formatter";
import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import { cn } from "@/lib/utils";
import { Alert } from "@/ui/components/alert";
import { buttonVariants } from "@/ui/components/button";
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
                    <Skeleton className="rounded-full w-24 h-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="rounded-full w-24 h-6" />
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
                <Link
                  className={cn(buttonVariants({ variant: "outline" }))}
                  href={`/employee/${employee.id}/edit`}
                >
                  <Pencil />
                </Link>
                <DeleteEmployee id={employee.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Link
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "absolute bottom-6 right-6 rounded-full bg-primary p-6 text-primary-foreground hover:bg-primary/80 hover:text-white hover:scale-105 transition-all"
        )}
        href={`/employee/create`}
      >
        <Plus />
      </Link>
      {/* Or we can use Next Error boundaries (https://nextjs.org/docs/app/building-your-application/routing/error-handling#using-error-boundaries) */}
      {isError && (
        <Alert variant="destructive">Error while loading employees</Alert>
      )}
    </>
  );
}
