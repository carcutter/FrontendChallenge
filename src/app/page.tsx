"use client";

import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/ui/components/breadcrumb";
import { Button } from "@/ui/components/button";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isError } = useGetEmployeeList();

  return (
    <>
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
        <h1 className="text-2xl">
          Employee List {data && <span>({data.length})</span>}
        </h1>
        <Link href={`/employee/create`}>
          <Button variant="outline">Create</Button>
        </Link>
        {data && (
          <ol className="flex flex-col gap-2">
            {data?.map((employee, index) => (
              <li key={index}>
                <Link href={`/employee/${employee.id}`}>
                  <EmployeeCard employee={employee} />
                </Link>
              </li>
            ))}
          </ol>
        )}

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
    </>
  );
}
