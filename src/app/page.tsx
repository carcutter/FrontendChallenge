"use client";
import {
  EmployeeFilterEnum,
  useEmployeeManagement,
} from "@/domain/hooks/useManageEmployeeList.hook";
import { EmployeeModel } from "@/domain/models/employee.model";
import {
  AddButton,
  Col,
  Dropdown,
  DropdownItem,
  EmployeeList,
  ErrorIndicator,
  Header,
  IconColumn,
  LoadingIndicator,
  MainContainer,
  PageContainer,
  SearchContainer,
  SearchInput,
  SortButton,
  SortButtons,
  Typography,
} from "@/styles/home.styles";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus, FaRegEye, FaSearch } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { RiDeleteBin6Line, RiEditBoxLine, RiUser2Fill } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";

export default function Home() {
  const {
    searchQuery,
    sortType,
    sortAscending,
    filteredEmployees,
    isLoading,
    isError,
    handleSearch,
    handleSort,
    handleDelete,
    handleEdit,
  } = useEmployeeManagement();
  const router = useRouter();

  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeModel | null>(null);

  if (isLoading) return <LoadingIndicator>Loading...</LoadingIndicator>;

  if (!filteredEmployees && !isLoading && isError)
    return <ErrorIndicator>Error</ErrorIndicator>;

  return (
    <PageContainer>
      <Header>
        <Col>
          <Typography size={23}>Employee List</Typography>
          <Typography size={23}>
            {filteredEmployees && <span>({filteredEmployees.length})</span>}
          </Typography>
        </Col>
        <Col>
          <SearchContainer>
            <SearchInput
              placeholder="Search employees..."
              onChange={handleSearch}
            />
            <FaSearch size={20} />
          </SearchContainer>
        </Col>
      </Header>
      <SortButtons>
        <SortButton
          $active={sortType === "id"}
          onClick={() => handleSort(EmployeeFilterEnum.ID)}
        >
          <MdFormatListNumberedRtl />
          ID {sortType === "id" ? (sortAscending ? "↑" : "↓") : ""}
        </SortButton>
        <SortButton
          $active={sortType === "employee_name"}
          onClick={() => handleSort(EmployeeFilterEnum.NAME)}
        >
          <RiUser2Fill />
          Name {sortType === "employee_name" ? (sortAscending ? "↑" : "↓") : ""}
        </SortButton>
        <SortButton
          $active={sortType === "employee_salary"}
          onClick={() => handleSort(EmployeeFilterEnum.SALARY)}
        >
          <HiCurrencyDollar />
          Salary{" "}
          {sortType === "employee_salary" ? (sortAscending ? "↑" : "↓") : ""}
        </SortButton>
      </SortButtons>
      <MainContainer>
        <EmployeeList onMouseLeave={() => setSelectedEmployee(null)}>
          {filteredEmployees?.map((employee) => (
            <EmployeeCard
              key={employee?.id}
              employee={employee as EmployeeModel}
              searchQuery={searchQuery}
              actionItem={
                employee && (
                  <IconColumn
                    onMouseEnter={() => setSelectedEmployee(employee)}
                  >
                    <TfiMoreAlt size={20} />
                    {selectedEmployee?.id === employee?.id && (
                      <Dropdown>
                        <DropdownItem
                          onClick={() =>
                            router.push(`/employee/${employee?.id}`)
                          }
                        >
                          <FaRegEye /> View
                        </DropdownItem>

                        <DropdownItem onClick={() => handleEdit(employee)}>
                          <RiEditBoxLine /> Edit
                        </DropdownItem>
                        <DropdownItem onClick={() => handleDelete(employee)}>
                          <RiDeleteBin6Line /> Delete
                        </DropdownItem>
                      </Dropdown>
                    )}
                  </IconColumn>
                )
              }
            />
          ))}
        </EmployeeList>
        <Typography size={20}>End of List</Typography>
      </MainContainer>
      <AddButton onClick={() => router.push("/employee/create")}>
        <FaPlus size={23} />
      </AddButton>
    </PageContainer>
  );
}
