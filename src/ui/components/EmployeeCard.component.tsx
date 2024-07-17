import EmployeeFormatter from "@/core/formatters/employee.formatter";
import { EmployeeModel } from "@/domain/models/employee.model";
import styled from "styled-components";

export interface EmployeeCardProps {
  employee: EmployeeModel;
  searchQuery?: string;
  actionItem?: React.ReactNode;
}

const EmployeeCard = ({
  employee,
  searchQuery,
  actionItem,
}: EmployeeCardProps) => {
  const highlightedText = (text: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <Highlighted key={index}>{part}</Highlighted>
      ) : (
        part
      )
    );
  };

  return (
    <EmployeeListItem>
      <Column>
        <Identifier>{employee.id}</Identifier>
      </Column>
      <ColumnFlex>
        <EmployeeInfo>
          <EmployeeName>{highlightedText(employee.employee_name)}</EmployeeName>
          <EmployeeDetails>
            Salary:{" "}
            {highlightedText(
              EmployeeFormatter.formatSalary(employee.employee_salary)
            )}
          </EmployeeDetails>
        </EmployeeInfo>
      </ColumnFlex>
      {actionItem && actionItem}
    </EmployeeListItem>
  );
};

export default EmployeeCard;

const Highlighted = styled.span`
  background-color: #1fee60;
  color: black;
`;

// Styled components definitions, keep them unchanged as per your request.
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 50px;
`;

const ColumnFlex = styled(Column)`
  align-items: flex-start;
  flex: 1;
`;

const EmployeeListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  margin: 5px 0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background-color: #e4eef3;
  }
`;

const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmployeeName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const EmployeeDetails = styled.span`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
  margin-bottom: 2px;
`;

const Identifier = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #555;
  margin-right: 15px;
`;
