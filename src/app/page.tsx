"use client";

import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isError } = useGetEmployeeList();

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      <h1>Employee List {data && <span>({data.length})</span>}</h1>
      <Link className="border px-2 py-1 rounded-md" href={`/employee/create`}>
        Create
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
  );
}
