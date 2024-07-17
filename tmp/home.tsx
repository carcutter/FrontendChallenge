"use client";

import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  const { data, isLoading, isError } = useGetEmployeeList();
  console.log("data: ", data);

  return (
    <MainContainer>
      {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
      {!data && !isLoading && isError && <ErrorIndicator>Error</ErrorIndicator>}
      <Header>
        Employee List{data && <span> ({data.length})</span>}
        <StyledLink href="/employee/create">
          <i className="fa-solid fa-plus"></i>
        </StyledLink>
      </Header>
      <EmployeeList>
        {data ? (
          data.map((employee, index) => (
            <EmployeeListItem key={index}>
              <Link href={`/employee/${employee.id}`}>
                <a>
                  <EmployeeCard employee={employee} />
                </a>
              </Link>
            </EmployeeListItem>
          ))
        ) : (
          <NoDataIndicator>No Employees Found</NoDataIndicator>
        )}
      </EmployeeList>
    </MainContainer>
  );
}

// Styled components for the Home page
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  gap: 20px;
  background: rgba(147, 51, 234, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: clamp(320px, 50vw, 600px);
  margin: 20px auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #934de6;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #7b26d5;
  }
`;

const EmployeeList = styled.ol`
  width: 100%;
  list-style: none;
`;

const EmployeeListItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const ErrorIndicator = styled.div`
  color: red;
  width: 100%;
  text-align: center;
`;

const NoDataIndicator = styled.div`
  text-align: center;
  width: 100%;
  padding: 20px;
  color: #666;
`;
