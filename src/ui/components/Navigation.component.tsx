import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./breadcrumb";

export interface NavigationProps {}

const Navigation = ({}: NavigationProps): ReactNode => {
  const pathname = usePathname();
  const params = useParams<{ employeeId: string }>();

  if (pathname === "/") {
    return null;
  }

  return (
    <Breadcrumb className="p-4">
      <BreadcrumbList className="items-baseline">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathname.includes("employee") && !pathname.includes("create") ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem
              className={cn(!pathname.includes("edit") && "text-2xl")}
            >
              <BreadcrumbLink href={`/employee/${params.employeeId}`}>
                {params.employeeId}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : null}
        {pathname.includes("create") ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-2xl">
              Create Employee
            </BreadcrumbItem>
          </>
        ) : null}
        {pathname.includes("edit") ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-2xl">Edit Employee</BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default Navigation;
